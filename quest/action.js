const randomManager = require('../random/random.manager');

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
    hero.hp -= 1000;
    hero.status = 11;

    // TODO if ready for finale, determine here
    // hero.status = 12;
}

function finale(hero) {
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

function readyForFinale(hero) {
    // todo calculate by distance
    // IF hero.status 3 && hasQuest && distance travelled = distance required
    return false;
}
