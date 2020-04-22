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

module.exports = randomController;