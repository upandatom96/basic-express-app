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

function pickStorySynonym() {
  return randomUtil.pickRandom(constants.STORY_PIECES.STORY_FOR_SYNONYMS);
}

function pickQuestWord() {
  return randomUtil.pickRandom(constants.QUEST_PIECES.QUEST_WORDS);
}

function pickLastName() {
  const lastNames = constants.QUEST_PIECES.FAMILY_NAMES.concat(constants.TITLE_BASES.MANOR_NAMES);
  return randomUtil.pickRandom(lastNames);
}

function pickAbility() {
  return randomUtil.pickRandom(constants.QUEST_ATTRIBUTES.ABILITIES);
}

function pickWeakness() {
  return randomUtil.pickRandom(constants.QUEST_ATTRIBUTES.WEAKNESSES);
}

function pickBackstory() {
  return randomUtil.pickRandom(constants.QUEST_ATTRIBUTES.BACKSTORY);
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
  pickQuestWord,
  getNewPhrase,
  getWordCount,
  pickAbility,
  pickWeakness,
  pickBackstory,
  pickStoryPrefix,
  pickStoryBase: pickStorySynonym,
  pickNoun,
  pickLastName,
  pickAdjective
}
