const constantsManager = require('../constants/constants.manager');

function findQuest(name) {
    return constantsManager.QUEST_QUESTS.QUESTS.find((quest) => {
        return quest.name === name;
    });
}

function findChapterEvent(name) {
    return constantsManager.QUEST_CHAPTER_EVENTS.CHAPTER_EVENTS.find((event) => {
        return event.name === name;
    });
}

function findSpecialMoves(names) {
    return constantsManager.HERO_MOVES.SPECIAL_MOVES.filter((move) => {
        return names.includes(move.name);
    });
}

module.exports = {
    findQuest,
    findChapterEvent,
    findSpecialMoves,
}
