const constantsManager = require('../constants/constants.manager');

function findQuest(code) {
    return constantsManager.QUEST_QUESTS.QUESTS.find((quest) => {
        return quest.code === code;
    });
}

function findChapterEvent(code) {
    return constantsManager.QUEST_CHAPTER_EVENTS.CHAPTER_EVENTS.find((chapterEvent) => {
        return chapterEvent.code === code;
    });
}

function findFinaleEvent(code) {
    return constantsManager.QUEST_FINALE_EVENTS.FINALE_EVENTS.find((finaleEvent) => {
        return finaleEvent.code === code;
    });
}

function findFinaleEventForQuest(code) {
    const quest = findQuest(code);
    return findFinaleEvent(quest.finaleEventCode);
}

module.exports = {
    findQuest,
    findChapterEvent,
    findFinaleEvent,
    findFinaleEventForQuest,
}
