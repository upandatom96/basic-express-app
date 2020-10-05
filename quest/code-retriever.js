const constantsManager = require('../constants/constants.manager');

function findQuest(code) {
    return constantsManager.QUEST_QUESTS.QUESTS.find((quest) => {
        return quest.code === code;
    });
}

function findChapterEvent(code) {
    return constantsManager.QUEST_CHAPTER_EVENTS.CHAPTER_EVENTS.find((event) => {
        return event.code === code;
    });
}

function findSpecialMoves(codes) {
    return constantsManager.HERO_MOVES.SPECIAL_MOVES.filter((move) => {
        return codes.includes(move.code);
    });
}

module.exports = {
    findQuest,
    findChapterEvent,
    findSpecialMoves,
}
