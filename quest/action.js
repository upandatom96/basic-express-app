const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');
const eventHandler = require('./event-handler');

function checkHealth(hero) {
    enforceMaxHealth(hero);
    checkHeartbeat(hero);
}

function revealHero(hero) {
    hero.status = 1;
}

function revealBackstory(hero) {
    hero.status = 2;
}

function revealStats(hero) {
    hero.status = 10;
}

function gainNewQuest(hero) {
    const newQuest = randomManager.pickQuest();
    hero.currentQuestCode = newQuest.code;
    hero.distanceTravelled = 0;
    hero.status = 11;
}

function travel(hero) {
    const message = eventHandler.handleChapterEvent(hero);

    hero.status = isReadyForFinale(hero) ? 12 : 11;

    return message;
}

function finale(hero) {
    const message = eventHandler.handleFinaleEvent(hero);

    hero.status = 13;

    return message;
}

function rest(hero) {
    healHalfHealth(hero);
    levelUp(hero);
    hero.status = 10;
}

function death(hero) {
    hero.status = 99;
}

module.exports = {
    checkHealth,
    revealHero,
    revealBackstory,
    revealStats,
    gainNewQuest,
    travel,
    finale,
    rest,
    death,
}

function isReadyForFinale(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const distanceReq = quest.distanceRequired;
    return hero.distanceTravelled >= distanceReq;
}

function enforceMaxHealth(hero) {
    if (hero.hp > hero.hpMax) {
        hero.hp = hero.hpMax;
    }
}

function checkHeartbeat(hero) {
    if (hero.hp <= 0) {
        hero.hp = 0;
        hero.status = 98;
    }
}

function healHalfHealth(hero) {
    const halfHealth = hero.hpMax / 2;
    hero.hp += halfHealth;
    enforceMaxHealth(hero);
}

function levelUp(hero) {
    hero.level++;
}
