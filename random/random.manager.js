const words = require("./words");
const randomUtil = require("../utilities/random.util");

function getOneNoun() {
  return pickNoun();
}

function getOneAdjective() {
  return pickAdjective();
}

function getAllWords() {
  return {
    adjectives: words.adjectives,
    nouns: words.nouns
  };
}

function getPhrase() {
  return pickAdjective() + " " + pickNoun();;
}

module.exports = {
  getOneNoun,
  getOneAdjective,
  getAllWords,
  getPhrase
}

function pickNoun() {
  return randomUtil.pickRandom(words.nouns);
}

function pickAdjective() {
  return randomUtil.pickRandom(words.adjectives);
}