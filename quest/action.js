const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');

function checkHealth(hero) {
    if (hero.hp > hero.hpMax) {
        hero.hp = hero.hpMax;
    }

    if (hero.hp <= 0) {
        hero.hp = 0;
        hero.status = 98;
    }
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
    const chapterEvent = randomManager.pickChapterEvent();
    const healthChange = -10;
    const distance = 5;

    hero.hp += healthChange;
    hero.distanceTravelled += distance;
    hero.distanceTravelledTotal += distance;

    // todo item?
    // todo ally?

    if (isReadyForFinale(hero)) {
        hero.status = 12;
    } else {
        hero.status = 11;
    }

    const positiveSymbol = healthChange >= 0 ? "+" : "";
    return `travelled ${distance} // hp ${positiveSymbol}${healthChange} // ${chapterEvent.code}`;
}

function finale(hero) {
    const finaleEvent = codeRetriever.findFinaleEventForQuest(hero.currentQuestCode);
    hero.status = 13;

    return `finale happened ${finaleEvent.code}`;
}

function rest(hero) {
    // heal some
    // level up
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
