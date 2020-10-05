const randomManager = require('../random/random.manager');
const codeRetriever = require('./code-retriever');
const eventHandler = require('./event-handler');

const HeroStatus = require('../constants/quest/hero-status');
const ChapterTypes = require('../constants/quest/chapter-event-types');

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
    const chapterEvent = eventHandler.startChapterEvent(hero);

    switch (chapterEvent.type) {
        case ChapterTypes.PATHS:
            hero.status = HeroStatus.QUEST_CHAPTER_PATH_END;
            break;
        case ChapterTypes.FLAVOR:
            eventHandler.concludeChapter(hero);
            hero.status = HeroStatus.QUEST_TRAVEL;
            break;
        case ChapterTypes.CHOICE:
            hero.status = HeroStatus.QUEST_CHAPTER_CHOICE_END;
            break;
        case ChapterTypes.DIRECT:
            hero.status = HeroStatus.QUEST_CHAPTER_DIRECT_END;
            break;
        case ChapterTypes.ENCOUNTER:
            hero.enemyHp = chapterEvent.enemyHpStart;

            const heroFaster = hero.dexterity > chapterEvent.dexterity;
            if (heroFaster) {
                hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_HERO;
            } else {
                hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_ENEMY;
            }

            break;
        default:
            hero.status = HeroStatus.ERR;
            console.log("INVALID CHAPTER TYPE: " + chapterEvent.type);
    }

    return chapterEvent.intro;
}

function endPathChapter(hero) {
    const message = eventHandler.finishPathEvent(hero);

    hero.status = HeroStatus.QUEST_TRAVEL;
    checkHealth(hero);

    return message;
}

function endChoiceChapter(hero) {
    const message = eventHandler.finishChoiceEvent(hero);

    hero.status = HeroStatus.QUEST_TRAVEL;
    checkHealth(hero);

    return message;
}

function endDirectChapter(hero) {
    const message = eventHandler.finishDirectEvent(hero);

    hero.status = HeroStatus.QUEST_TRAVEL;
    checkHealth(hero);

    return message;
}

function chapterEncounterHeroTurn(hero) {
    const chapterEvent = codeRetriever.findChapterEvent(hero.currentChapterCode);

    hero.enemyHp -= 1;

    hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_ENEMY;

    const enemyDead = hero.enemyHp <= 0;
    if (enemyDead) {
        hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_END;
    }

    checkHealth(hero);

    return `Hero Attacks, enemy -1 hp. ENEMY ${hero.enemyHp}/${chapterEvent.enemyHpMax}`;
}

function chapterEncounterEnemyTurn(hero) {
    const chapterEvent = codeRetriever.findChapterEvent(hero.currentChapterCode);

    hero.hp -= 1;

    hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_HERO;

    const enemyDead = hero.enemyHp <= 0;
    if (enemyDead) {
        hero.status = HeroStatus.QUEST_CHAPTER_ENCOUNTER_END;
    }

    checkHealth(hero);

    return `Enemy Attacks, hero -1 hp. ENEMY ${hero.enemyHp}/${chapterEvent.enemyHpMax}`;
}

function chapterEncounterEnd(hero) {
    hero.status = HeroStatus.QUEST_TRAVEL;
    hero.enemyHp = null;

    return "End Encounter...";
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
    const message = eventHandler.startFinaleEvent(hero);

    hero.status = HeroStatus.QUEST_FINALE_END;

    return message;
}

function endFinale(hero) {
    const message = eventHandler.finishFinaleEvent(hero);

    hero.status = HeroStatus.REST_START;

    checkHealth(hero);

    return message;
}

function startRest(hero) {
    levelUp(hero);

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
    hero.quest
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
    endFinale,
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
        if (heroIsAlive(hero)) {
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

function levelUp(hero) {
    hero.level++;
}

function heroIsAlive(hero) {
    const deadStatuses = [HeroStatus.DYING, HeroStatus.OBITUARY, HeroStatus.DEAD];
    return !deadStatuses.includes(hero.status);
}

function addDistance(hero) {
    const distance = randomUtil.pickRandomNumber(5, 15);
    hero.distanceTravelled += distance;
    hero.distanceTravelledTotal += distance;
    return distance;
}
