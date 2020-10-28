const express = require('express');
const randomController = express.Router();
const randomManager = require("./random.manager");

randomController.get('/noun', (req, res) => {
  const noun = randomManager.getOneNoun();
  res.send(noun);
});

randomController.get('/adjective', (req, res) => {
  const adjective = randomManager.getOneAdjective();
  res.send(adjective);
});

randomController.get('/all', (req, res) => {
  const words = randomManager.getAllWords();
  res.send(words);
});

randomController.get('/phrase', (req, res) => {
  const phrase = randomManager.getPhrase();
  res.send(phrase);
});

randomController.get('/wordCount', (req, res) => {
  const wordCount = randomManager.getWordCount();
  res.send(wordCount);
});

randomController.get('/d/:diceLimit', (req, res) => {
  const diceLimit = Number(req.params.diceLimit);
  const result = randomManager.rollDie(diceLimit);
  res.send(result);
});

randomController.get('/d20', (req, res) => {
  const result = randomManager.rollDie(20);
  res.send(result);
});

randomController.get('/d6', (req, res) => {
  const result = randomManager.rollDie(6);
  res.send(result);
});

module.exports = randomController;
