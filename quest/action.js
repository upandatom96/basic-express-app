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
    const healthChange = -100;
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
}

function finale(hero) {
    const finaleEvent = codeRetriever.findFinaleEventForQuest(hero.currentQuestCode);
    hero.status = 13;
}

function rest(hero) {
    hero.status = 3;
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
    const distanceReq = codeRetriever.findQuest(hero.currentQuestCode);
    return hero.distanceTravelled >= distanceReq;
}
