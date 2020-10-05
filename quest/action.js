const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');
const eventHandler = require('./event-handler');

const HeroStatus = require('../constants/quest/hero-status');
const EventTypes = require('../constants/quest/event-types');

const randomUtil = require('../utilities/random.util');

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
    hero.status = HeroStatus.REVEAL_MOVE;
}

function revealMove(hero) {
    hero.status = HeroStatus.SET_OFF;
}

function setOff(hero) {
    hero.status = HeroStatus.QUEST_FIND;
}

function findNewQuest(hero) {
    const newQuest = randomManager.pickQuest();
    hero.currentQuestCode = newQuest.code;
    hero.distanceTravelled = 0;
    hero.status = HeroStatus.QUEST_NEW;
}

function startNewQuest(hero) {
    hero.status = HeroStatus.QUEST_TRAVEL;
}

function startChapter(hero) {
    const chapterEvent = randomManager.pickChapterEvent();
    hero.currentChapterCode = chapterEvent.code;

    switch (chapterEvent.type) {
        case EventTypes.PATHS:
            hero.status = HeroStatus.QUEST_CHAPTER_PATH_END;
            break;
        case EventTypes.FLAVOR:
            wrapUpChapter(hero);
            hero.status = HeroStatus.QUEST_TRAVEL;
            break;
        case EventTypes.CHOICE:
            hero.status = HeroStatus.QUEST_CHAPTER_CHOICE_END;
            break;
        case EventTypes.DIRECT:
            hero.status = HeroStatus.QUEST_CHAPTER_DIRECT_END;
            break;
        case EventTypes.ENCOUNTER:
            hero.enemyHp = chapterEvent.enemyHpStart;

            const heroFaster = hero.dexterity > chapterEvent.dexterity;
            hero.status = heroFaster ?
                HeroStatus.QUEST_CHAPTER_ENCOUNTER_HERO :
                HeroStatus.QUEST_CHAPTER_ENCOUNTER_ENEMY;

            break;
        default:
            hero.status = HeroStatus.ERR;
            console.log("INVALID CHAPTER TYPE: " + chapterEvent.type);
    }

    return chapterEvent.intro;
}

function endPathChapter(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.finishPathEvent(hero, event);

    wrapUpChapter(hero);
    return message;
}

function endChoiceChapter(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.finishChoiceEvent(hero, event);

    wrapUpChapter(hero);
    return message;
}

function endDirectChapter(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.finishDirectEvent(hero, event);

    wrapUpChapter(hero);
    return message;
}

function chapterEncounterHeroTurn(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.heroTurnEncounter(hero, event);

    hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_ENEMY;
    checkEncounterHealth(hero);
    return message;
}

function chapterEncounterEnemyTurn(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.enemyTurnEncounter(hero, event);

    hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_HERO;
    checkEncounterHealth(hero);
    return message;
}

function chapterEncounterEnd(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.finishEncounterEvent(hero, event);

    wrapUpChapter(hero);
    return message;
}

function travel(hero) {
    const distance = addDistance(hero);
    const ready = isReadyForFinale(hero);

    hero.status = ready ?
        HeroStatus.QUEST_FINALE_START :
        HeroStatus.QUEST_CHAPTER_START;

    const additionalMessage = ready ?
        " They have reached their destination." :
        " Their journey continues...";

    return `{HERO_FIRST} travels ${distance} miles.${additionalMessage}`;
}

function startFinale(hero) {
    const event = getFinaleEvent(hero);

    if (event.type === EventTypes.PATHS) {
        hero.status = HeroStatus.QUEST_FINALE_PATH_END;
    } else {
        hero.status = HeroStatus.ERR;
    }


    return event.intro;
}

function finalePathEnd(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.finishPathEvent(hero, event);

    hero.status = HeroStatus.REST_START;

    checkHealth(hero);

    return message;
}

function startRest(hero) {
    hero.level++;

    hero.completedQuestCodeLog.push(hero.currentQuestCode);
    hero.currentQuestCode = null;

    hero.status = HeroStatus.REST_END;
}

function endRest(hero) {
    restHealth(hero);

    hero.status = HeroStatus.QUEST_FIND;
}

function die(hero) {
    hero.status = HeroStatus.OBITUARY;
    hero.deathDate = new Date();
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
    revealMove,
    findNewQuest,
    startNewQuest,
    setOff,
    startChapter,
    endPathChapter,
    endChoiceChapter,
    endDirectChapter,
    chapterEncounterHeroTurn,
    chapterEncounterEnemyTurn,
    chapterEncounterEnd,
    travel,
    startFinale,
    finalePathEnd,
    startRest,
    endRest,
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

        const deadStatuses = [HeroStatus.DYING, HeroStatus.OBITUARY, HeroStatus.DEAD];
        const heroIsAlive = !deadStatuses.includes(hero.status);
        if (heroIsAlive) {
            hero.status = HeroStatus.DYING;
        }
    }
}

function restHealth(hero) {
    hero.hpMax += 5;

    const quarterHealth = hero.hpMax / 4;
    const someHealth = Math.floor(quarterHealth);
    hero.hp += someHealth;

    enforceMaxHealth(hero);
}

function addDistance(hero) {
    const distance = randomUtil.pickRandomNumber(4, 11);
    hero.distanceTravelled += distance;
    hero.distanceTravelledTotal += distance;
    return distance;
}

function wrapUpChapter(hero) {
    hero.status = HeroStatus.QUEST_TRAVEL;
    hero.completedChapterCodeLog.push(hero.currentChapterCode);
    hero.currentChapterCode = null;
    hero.enemyHp = null;
    checkHealth(hero);
}

function checkEncounterHealth(hero) {
    const enemyDead = hero.enemyHp <= 0;
    if (enemyDead) {
        hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_END;
    }
    checkHealth(hero);
}

function getChapterEvent(hero) {
    return codeRetriever.findChapterEvent(hero.currentChapterCode);
}

function getFinaleEvent(hero) {
    return codeRetriever.findQuest(hero.currentQuestCode).finaleEvent;
}
