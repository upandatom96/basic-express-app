const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');
const eventHandler = require('./event-handler');

const HeroStatus = require('../constants/quest/hero-status');
const EventTypes = require('../constants/quest/event-types');
const HeroMoves = require('../constants/quest/hero-moves');

const randomUtil = require('../utilities/random.util');
const boolUtil = require('../utilities/bool.util');

const selectedQuestNames = [];
const selectedChapterNames = [];

function checkHealth(hero) {
    enforceMaxHealth(hero);
    checkHeartbeat(hero);
}

function revealHero(hero) {
    hero.status = HeroStatus.REVEAL_BACKSTORY;
}

function revealBackstory(hero) {
    hero.status = HeroStatus.REVEAL_ALIGNMENT;
}

function revealAlignment(hero) {
    hero.status = HeroStatus.REVEAL_LOADOUT;
}

function revealLoadout(hero) {
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
    const newQuest = randomManager.pickQuest(selectedQuestNames);
    hero.currentQuestName = newQuest.name;
    hero.distanceTravelled = 0;
    hero.status = HeroStatus.QUEST_NEW;
}

function startNewQuest(hero) {
    hero.status = HeroStatus.QUEST_TRAVEL;
}

function startChapter(hero) {
    const event = randomManager.pickChapterEvent(selectedChapterNames);
    hero.currentChapterName = event.name;

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
    if (boolUtil.hasValue(hero.currentChapterName)) {
        hero.completedChapterLog.push(hero.currentChapterName);
        hero.currentChapterName = null;
    }
    const message = getTravelBaseMessage(hero);
    const quest = codeRetriever.findQuest(hero.currentQuestName);
    const ready = isReadyForFinale(hero);

    if (ready) {
        hero.status = HeroStatus.QUEST_FINALE_START;
        const TEMPLATES = [
            `They breathe a sigh of relief.`,
            `They made it!`,
            `Finally, they can complete their quest.`,
        ];
        const endMsg = randomUtil.pickRandom(TEMPLATES);
        return `${message} They have reached their destination, the ${quest.destination}. ${endMsg}`
    } else {
        hero.status = HeroStatus.QUEST_CHAPTER_START;
        const message = runTravelScenario(hero);
        checkHealth(hero);
        return `${message} They have travelled ${hero.distanceTravelled} of ${quest.distanceRequired} miles. ${message}`
    }
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
    hero.completedQuestLog.push(hero.currentQuestName);
    hero.currentQuestName = null;

    if (shouldLevelUp(hero)) {
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

function getUnlearnedMoves(hero) {
    return HeroMoves.SPECIAL_MOVES.filter((move) => {
        return !hero.specialMoves.includes(move.name);
    });
}

function shouldLearnNewMove(hero) {
    const unlearnedMoves = getUnlearnedMoves(hero);
    const hasMovesToLearn = unlearnedMoves.length > 0;
    return hasMovesToLearn && randomUtil.trueOrFalse();
}

function gainPerk(hero) {
    hero.status = HeroStatus.REST_HEAL;

    if (shouldLearnNewMove(hero)) {
        // PERK 1: NEW MOVE
        return applyNewMove(hero);
    } else {
        // PERK 2: STAT BOOST
        return applyStatBoost(hero);
    }
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

function error(hero) {
    hero.hp = 0;
}

function obituary(hero) {
    hero.status = HeroStatus.DEAD;
}

module.exports = {
    checkHealth,
    revealHero,
    revealBackstory,
    revealAlignment,
    revealLoadout,
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
    error,
}

function isReadyForFinale(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestName);
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

    const quest = codeRetriever.findQuest(hero.currentQuestName);
    const remainingDistance = quest.distanceRequired - hero.distanceTravelled;
    if (distance > remainingDistance) {
        distance = remainingDistance;
    }

    hero.distanceTravelled += distance;
    hero.distanceTravelledTotal += distance;
    return distance;
}

function wrapUpChapter(hero) {
    hero.enemyHp = null;
    hero.status = HeroStatus.QUEST_TRAVEL;
    checkHealth(hero);
}

function wrapUpFinale(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestName);
    if (boolUtil.hasValue(quest.expPoints)) {
        hero.expPoints += quest.expPoints;
    }
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
    return codeRetriever.findChapterEvent(hero.currentChapterName);
}

function getFinaleEvent(hero) {
    return codeRetriever.findQuest(hero.currentQuestName).finaleEvent;
}

function applyNewMove(hero) {
    const unlearnedMoves = getUnlearnedMoves(hero);
    const newMove = randomUtil.pickRandom(unlearnedMoves).name;
    hero.specialMoves.push(newMove);
    return `{HERO_FIRST} learns a SPECIAL MOVE called ${newMove}.`;
}

function applyStatBoost(hero) {
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

function shouldLevelUp(hero) {
    const levelThreshold = (hero.level * 100) + ((hero.level - 1) * (hero.level) * 10);
    return hero.expPoints >= levelThreshold;
}

function getTravelBaseMessage(hero) {
    const distance = addDistance(hero);
    const sOrNot = distance > 1 ? "s" : "";
    return `{HERO_FIRST} travels ${distance} mile${sOrNot}.`;
}
function runTravelScenario(hero) {
    // TODO use CHECK_WORLD instead of random #
    const randomNumber = randomUtil.pickRandomNumber(0, 100);
    if (randomNumber > 90) {
        hero.hp += 5;
        return "They find an apple and recover some health.";
    } else if (randomNumber < 10) {
        hero.hp -= 5;
        return "They trip over a snake and loss some health.";
    } else {
        const TEMPLATES = [
            `Their journey continues...`,
            `They need to go just a bit further...`,
            `What will happen next?`,
            `They are tired but they must carry on.`,
            `They take their next step...`,
            `They wonder how long this will go on.`,
            `They continue bravely and confidently.`,
            `They pick up the pace.`,
            `They hope they didn't leave the stove on.`,
            `They swear they've passed this spot before...`,
            `They worry it may rain soon.`,
            `The skies clear as they continue onward`,
            `Night begins, but they continue.`,
            `They hear whispers around them but keep moving.`,
        ];
        return randomUtil.pickRandom(TEMPLATES);
    }
}
