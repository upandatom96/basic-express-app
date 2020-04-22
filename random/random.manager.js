const words = require("./words");
const randomUtil = require("../utilities/random.util");

function getOneNoun() {
  return randomUtil.pickRandom(words.nouns);
}

function getOneAdjective() {
  return randomUtil.pickRandom(words.adjectives);
}

function getAllWords() {
  return {
    adjectives: words.adjectives,
    nouns: words.nouns
  };
}

module.exports = {
  getOneNoun,
  getOneAdjective,
  getAllWords
}