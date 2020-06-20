const constants = require("../constants/constants.manager");
const randomUtil = require("../utilities/random.util");

function getOneNoun() {
  return pickNoun();
}

function getOneAdjective() {
  return pickAdjective();
}

function getAllWords() {
  const adjectives = constants.ADJECTIVES;
  const nouns = constants.NOUNS;
  return {
    adjectives,
    nouns,
  };
}

function getWordCount() {
  const adjectives = constants.ADJECTIVES;
  const nouns = constants.NOUNS;
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

function pickStoryPrefix() {
  return randomUtil.pickRandom(constants.STORY_PIECES.STORY_PREFIXES);
}

function pickNoun() {
  return randomUtil.pickRandom(constants.NOUNS);
}

function pickAdjective() {
  return randomUtil.pickRandom(constants.ADJECTIVES);
}

module.exports = {
  getOneNoun,
  getOneAdjective,
  getAllWords,
  getPhrase,
  getNewPhrase,
  getWordCount,
  pickStoryPrefix,
  pickNoun,
  pickAdjective
}
