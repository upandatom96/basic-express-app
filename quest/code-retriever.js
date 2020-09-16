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

module.exports = {
    findQuest,
    findChapterEvent,
}
