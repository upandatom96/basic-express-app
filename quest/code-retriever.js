const constantsManager = require('../constants/constants.manager');
const Conditions = require('../constants/quest/conditions');
const HeroMoves = require('../constants/quest/hero-moves');
const EnemyMoves = require('../constants/quest/enemy-moves');

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

function findAdditionalHeroMoves(hero) {
    const specialMoves = findSpecialMoves(hero.specialMoves);
    const conditionMoves = findConditionHeroMoves(hero.conditions);
    return specialMoves.concat(conditionMoves);
}

function findAdditionalEnemyMoves(hero) {
    return findConditionEnemyMoves(hero.enemyConditions);
}

function findConditionHeroMoves(conditions) {
    const conditionMoves = [];
    if (conditions.includes(Conditions.VAMPIRISM)) {
        conditionMoves.concat(HeroMoves.VAMPIRISM_MOVES);
    }
    return conditionMoves;
}

function findConditionEnemyMoves(conditions) {
    const conditionMoves = [];
    if (conditions.includes(Conditions.VAMPIRISM)) {
        conditionMoves.concat(EnemyMoves.VAMPIRISM_MOVES);
    }
    return conditionMoves;
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
    findAdditionalHeroMoves,
    findAdditionalEnemyMoves,
}
