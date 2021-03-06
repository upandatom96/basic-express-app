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

function pickQuest(selectedNames) {
    let availableQuests = constants.QUEST_QUESTS.QUESTS;
    if (selectedNames.length > 0) {
        availableQuests = availableQuests.filter((chapter) => {
            return selectedNames.includes(chapter.name);
        });
    }
    return randomUtil.pickRandom(availableQuests);
}

function pickChapterEvent(selectedNames) {
    let availableChapters = constants.QUEST_CHAPTER_EVENTS.CHAPTER_EVENTS
    if (selectedNames.length > 0) {
        availableChapters = availableChapters.filter((chapter) => {
            return selectedNames.includes(chapter.name);
        });
    }
    return randomUtil.pickRandom(availableChapters);
}

function pickRace() {
    return randomUtil.pickRandom(constants.RACES);
}

function pickColor() {
    return randomUtil.pickRandom([
        "red", "orange", "yellow", "green", "blue", "purple", "white", "black", "brown",
        "maroon", "teal", "mustard", "indigo", "pink", "navy", "gray",
    ]);
}

function pickAdvantage() {
    return randomUtil.pickRandom(constants.ADVANTAGES);
}

function pickDisadvantage() {
    return randomUtil.pickRandom(constants.DISADVANTAGES);
}

function pickStarterAlly() {
    return randomUtil.pickRandom(constants.STARTER_ALLIES);
}

function pickStarterItem() {
    return randomUtil.pickRandom(constants.STARTER_ITEMS);
}

function pickRandomSpecialMove() {
    return randomUtil.pickRandom(constants.HERO_MOVES.SPECIAL_MOVES);
}

function pickNoun() {
    return randomUtil.pickRandom(constants.NOUNS);
}

function pickAdjective() {
    return randomUtil.pickRandom(constants.ADJECTIVES);
}

function rollDie(diceLimit) {
    return randomUtil.pickRandomNumber(1, diceLimit).toString();
}

module.exports = {
    getOneNoun,
    getOneAdjective,
    getAllWords,
    getPhrase,
    pickQuestWord,
    getNewPhrase,
    getWordCount,
    pickQuest,
    pickChapterEvent,
    pickStarterAlly,
    pickStarterItem,
    pickColor,
    pickRace,
    pickAdvantage,
    pickDisadvantage,
    pickStoryPrefix,
    pickStoryBase: pickStorySynonym,
    pickNoun,
    pickLastName,
    pickAdjective,
    pickSpecialMove: pickRandomSpecialMove,
    rollDie,
}
