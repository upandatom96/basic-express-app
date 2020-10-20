const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');
const eventHandler = require('./event-handler');

const HeroStatus = require('../constants/quest/hero-status');
const EventTypes = require('../constants/quest/event-types');

const randomUtil = require('../utilities/random.util');

const selectedQuestCodes = [];
const selectedChapterCodes = [];

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
    const newQuest = randomManager.pickQuest(selectedQuestCodes);
    hero.currentQuestCode = newQuest.code;
    hero.distanceTravelled = 0;
    hero.status = HeroStatus.QUEST_NEW;
}

function startNewQuest(hero) {
    hero.status = HeroStatus.QUEST_TRAVEL;
}

function startChapter(hero) {
    const event = randomManager.pickChapterEvent(selectedChapterCodes);
    hero.currentChapterCode = event.code;

    switch (event.type) {
        case EventTypes.PATHS:
            hero.status = HeroStatus.QUEST_CHAPTER_PATH_END;
            break;
        case EventTypes.FLAVOR:
            wrapUpChapter(hero);
            break;
        case EventTypes.CHOICE:
            hero.status = HeroStatus.QUEST_CHAPTER_CHOICE_END;
            break;
        case EventTypes.DIRECT:
            hero.status = HeroStatus.QUEST_CHAPTER_DIRECT_END;
            break;
        case EventTypes.ENCOUNTER:
            hero.enemyHp = event.enemyHpStart;

            const heroFaster = hero.dexterity > event.dexterity;
            hero.status = heroFaster ?
                HeroStatus.QUEST_CHAPTER_ENCOUNTER_HERO :
                HeroStatus.QUEST_CHAPTER_ENCOUNTER_ENEMY;

            break;
        default:
            hero.status = HeroStatus.ERR;
            console.log("INVALID EVENT TYPE: " + event.type);
    }

    return event.intro;
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

function runEncounterHeroTurnChapter(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.heroTurnEncounter(hero, event);

    hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_ENEMY;
    checkEncounterHealth(hero, true);
    return message;
}

function runEncounterEnemyTurnChapter(hero) {
    const event = getChapterEvent(hero);

    const message = eventHandler.enemyTurnEncounter(hero, event);

    hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_HERO;
    checkEncounterHealth(hero, true);
    return message;
}

function endEncounterChapter(hero) {
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

    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const additionalMessage = ready ?
        ` They have reached their destination, the ${quest.destination}.` :
        ` They have travelled ${hero.distanceTravelled} of ${quest.distanceRequired} miles. Their journey continues...`;

    const sOrNot = distance > 1 ? "s" : "";
    return `{HERO_FIRST} travels ${distance} mile${sOrNot}.${additionalMessage}`;
}

function startFinale(hero) {
    const event = getFinaleEvent(hero);

    switch (event.type) {
        case EventTypes.PATHS:
            hero.status = HeroStatus.QUEST_FINALE_PATH_END;
            break;
        case EventTypes.FLAVOR:
            wrapUpFinale(hero);
            break;
        case EventTypes.CHOICE:
            hero.status = HeroStatus.QUEST_FINALE_CHOICE_END;
            break;
        case EventTypes.DIRECT:
            hero.status = HeroStatus.QUEST_FINALE_DIRECT_END;
            break;
        case EventTypes.ENCOUNTER:
            hero.enemyHp = event.enemyHpStart;

            const heroFaster = hero.dexterity > event.dexterity;
            hero.status = heroFaster ?
                HeroStatus.QUEST_FINALE_ENCOUNTER_HERO :
                HeroStatus.QUEST_FINALE_ENCOUNTER_ENEMY;
            break;
        default:
            hero.status = HeroStatus.ERR;
            console.log("INVALID EVENT TYPE: " + event.type);
    }

    return event.intro;
}

function endPathFinale(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.finishPathEvent(hero, event);

    wrapUpFinale(hero);
    return message;
}

function endChoiceFinale(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.finishChoiceEvent(hero, event);

    wrapUpFinale(hero);
    return message;
}

function endDirectFinale(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.finishDirectEvent(hero, event);

    wrapUpFinale(hero);
    return message;
}

function runEncounterHeroTurnFinale(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.heroTurnEncounter(hero, event);

    hero.status = HeroStatus.QUEST_FINALE_ENCOUNTER_ENEMY;
    checkEncounterHealth(hero, false);
    return message;
}

function runEncounterEnemyTurnFinale(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.enemyTurnEncounter(hero, event);

    hero.status = HeroStatus.QUEST_FINALE_ENCOUNTER_HERO;
    checkEncounterHealth(hero, false);
    return message;
}

function endEncounterFinale(hero) {
    const event = getFinaleEvent(hero);

    const message = eventHandler.finishEncounterEvent(hero, event);

    wrapUpFinale(hero);
    return message;
}

function startRest(hero) {
    hero.completedQuestCodeLog.push(hero.currentQuestCode);
    hero.currentQuestCode = null;

    const heroShouldLevelUp = true;
    if (heroShouldLevelUp) {
        hero.status = HeroStatus.REST_LEVEL_UP_PING;
    } else {
        hero.status = HeroStatus.REST_HEAL;
    }
}

function advanceLevel(hero) {
    hero.level++;
    hero.status = HeroStatus.REST_LEVEL_UP_HEALTH;
}

function gainMaxHealth(hero) {
    hero.hpMax += 5;
    hero.hp += 5;
    hero.status = HeroStatus.REST_LEVEL_UP_PERK;
    enforceMaxHealth(hero);
}

function gainPerk(hero) {
    const message = statBoost(hero);
    hero.status = HeroStatus.REST_HEAL;
    return message;
}

function restHeal(hero) {
    restHealth(hero);
    hero.status = HeroStatus.REST_EMERGE;
}

function emergeRest(hero) {
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
    runEncounterHeroTurnChapter,
    runEncounterEnemyTurnChapter,
    endEncounterChapter,
    travel,
    startFinale,
    endPathFinale,
    endChoiceFinale,
    endDirectFinale,
    runEncounterHeroTurnFinale,
    runEncounterEnemyTurnFinale,
    endEncounterFinale,
    startRest,
    advanceLevel,
    gainMaxHealth,
    gainPerk,
    restHeal,
    emergeRest,
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
    const quarterHealth = hero.hpMax / 4;
    const someHealth = Math.floor(quarterHealth);
    hero.hp += someHealth;

    enforceMaxHealth(hero);
}

function addDistance(hero) {
    const minDistance = 3;
    const maxDistance = 13;
    let distance = randomUtil.pickRandomNumber(minDistance, maxDistance) + hero.distanceBoost;
    hero.distanceBoost = 0;

    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const remainingDistance = quest.distanceRequired - hero.distanceTravelled;
    if (distance > remainingDistance) {
        distance = remainingDistance;
    }

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

function wrapUpFinale(hero) {
    hero.status = HeroStatus.REST_START;
    checkHealth(hero);
}

function checkEncounterHealth(hero, chapterMode) {
    const enemyDead = hero.enemyHp <= 0;
    if (enemyDead) {
        hero.status = chapterMode ?
            HeroStatus.QUEST_CHAPTER_ENCOUNTER_END :
            HeroStatus.QUEST_FINALE_ENCOUNTER_END;
    }
    checkHealth(hero);
}

function getChapterEvent(hero) {
    return codeRetriever.findChapterEvent(hero.currentChapterCode);
}

function getFinaleEvent(hero) {
    return codeRetriever.findQuest(hero.currentQuestCode).finaleEvent;
}

function statBoost(hero) {
    let message = "{HERO_FIRST} gets a STAT BOOST. ";
    const categoryNumber = randomUtil.pickRandomNumber(1, 4);
    switch (categoryNumber) {
        case 1:
            hero.strength++;
            message += `Their strength has risen from ${hero.strength - 1} to ${hero.strength}.`;
            break;
        case 2:
            hero.wisdom++;
            message += `Their wisdom has risen from ${hero.wisdom - 1} to ${hero.wisdom}.`;
            break;
        case 3:
            hero.charisma++;
            message += `Their charisma has risen from ${hero.charisma - 1} to ${hero.charisma}.`;
            break;
        case 4:
            hero.dexterity++
            message += `Their dexterity has risen from ${hero.dexterity - 1} to ${hero.dexterity}.`;
            break;
    }

    return message;
}
