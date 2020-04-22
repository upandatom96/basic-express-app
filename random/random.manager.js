const words = require("./words");
const randomUtil = require("../utilities/random.util");

function getOneNoun() {
  return pickNoun();
}

function getOneAdjective() {
  return pickAdjective();
}

function getAllWords() {
  const adjectives = words.adjectives;
  const nouns = words.nouns;
  return {
    adjectives,
    nouns,
  };
}

function getWordCount() {
  const adjectives = words.adjectives;
  const nouns = words.nouns;
  return {
    nounCount: nouns.length,
    adjectiveCount: adjectives.length,
    phraseCount: nouns.length * adjectives.length
  };
}

function getPhrase() {
  return pickAdjective() + " " + pickNoun();
}

function getNewPhrase(oldPhrases) {
  let foundNewPhrase = false;
  let phrase;
  while (!foundNewPhrase) {
    phrase = getPhrase();
    if (!oldPhrases.includes(phrase)) {
      foundNewPhrase = true;
    }
  }
  return phrase;
}

module.exports = {
  getOneNoun,
  getOneAdjective,
  getAllWords,
  getPhrase,
  getNewPhrase,
  getWordCount
}

function pickNoun() {
  return randomUtil.pickRandom(words.nouns);
}

function pickAdjective() {
  return randomUtil.pickRandom(words.adjectives);
}