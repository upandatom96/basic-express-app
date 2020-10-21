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

function pickAdvantage() {
    return randomUtil.pickRandom(constants.QUEST_ATTRIBUTES.ADVANTAGES);
}

function pickDisadvantage() {
    return randomUtil.pickRandom(constants.QUEST_ATTRIBUTES.DISADVANTAGES);
}

function pickBackstory() {
    return randomUtil.pickRandom(constants.QUEST_ATTRIBUTES.BACKSTORY);
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
    pickAdvantage,
    pickDisadvantage,
    pickBackstory,
    pickStoryPrefix,
    pickStoryBase: pickStorySynonym,
    pickNoun,
    pickLastName,
    pickAdjective,
    pickSpecialMove: pickRandomSpecialMove,
}
