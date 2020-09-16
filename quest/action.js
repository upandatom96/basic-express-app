const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');
const eventHandler = require('./event-handler');
const HeroStatus = require('./hero-status');

function checkHealth(hero) {
    enforceMaxHealth(hero);
    checkHeartbeat(hero);
}

function revealHero(hero) {
    hero.status = HeroStatus.REVEAL_BACKSTORY;
}

function revealBackstory(hero) {
    hero.status = HeroStatus.REVEAL_STATS;
}

function revealStats(hero) {
    hero.status = HeroStatus.REVEAL_SPECIAL;
}

function revealSpecial(hero) {
    hero.status = HeroStatus.SET_OFF;
}

function setOff(hero) {
    hero.status = HeroStatus.QUEST_NEW;
}

function gainNewQuest(hero) {
    const newQuest = randomManager.pickQuest();
    hero.currentQuestCode = newQuest.code;
    hero.distanceTravelled = 0;
    hero.status = HeroStatus.QUEST_CHAPTER_START;
}

function startChapter(hero) {
    hero.status = HeroStatus.QUEST_CHAPTER_END;

    return "START CHAPTER...";
}

function endChapter(hero) {
    const message = eventHandler.handleChapterEvent(hero);
    checkHealth(hero);

    hero.status = isReadyForFinale(hero) ?
        HeroStatus.QUEST_FINALE_START :
        HeroStatus.QUEST_CHAPTER_START;

    return message;
}

function startFinale(hero) {
    hero.status = HeroStatus.QUEST_FINALE_END;

    return "START FINALE";
}

function endFinale(hero) {
    const message = eventHandler.handleFinaleEvent(hero);

    hero.status = HeroStatus.REST;

    checkHealth(hero);

    return message;
}

function rest(hero) {
    healHalfHealth(hero);

    levelUp(hero);

    hero.status = HeroStatus.QUEST_NEW;
}

function die(hero) {
    hero.status = HeroStatus.OBITUARY;
}

function obituary(hero) {
    hero.status = HeroStatus.DEAD;
}

module.exports = {
    checkHealth,
    revealHero,
    revealBackstory,
    revealStats,
    revealSpecial,
    gainNewQuest,
    setOff,
    startChapter,
    endChapter,
    startFinale,
    endFinale,
    rest,
    die,
    obituary,
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
        if (heroIsAlive(hero)) {
            hero.status = HeroStatus.DYING;
        }
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

function heroIsAlive(hero) {
    const deadStatuses = [HeroStatus.DYING, HeroStatus.OBITUARY, HeroStatus.DEAD];
    return !deadStatuses.includes(hero.status);
}
