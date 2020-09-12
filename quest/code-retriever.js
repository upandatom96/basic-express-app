const constantsManager = require('../constants/constants.manager');

function findQuest(code) {
    return constantsManager.QUEST_QUESTS.QUESTS.find((quest) => {
        return quest.code === code;
    });
}

module.exports = {
    findQuest
}
