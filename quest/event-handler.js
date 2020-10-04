const randomUtil = require('../utilities/random.util');
const boolUtil = require('../utilities/bool.util');
const randomManager = require('../random/random.manager');

const codeRetriever = require('./code-retriever');
const trigger = require('./trigger');

function startChapterEvent(hero) {
    const chapterEvent = randomManager.pickChapterEvent();
    hero.currentChapterCode = chapterEvent.code;

    return chapterEvent;
}

function finishChapterEvent(hero) {
    const chapterEvent = codeRetriever.findChapterEvent(hero.currentChapterCode);
    hero.completedChapterCodeLog.push(hero.currentChapterCode);
    hero.currentChapterCode = null;

    const flavorText = takeChapterPath(chapterEvent, hero);

    return `${flavorText}`;
}

function startFinaleEvent(hero) {
    const finaleEvent = codeRetriever.findQuest(hero.currentQuestCode).finaleEvent;

    return `{HERO_FIRST} reaches their destination. ${finaleEvent.intro}`;
}

function finishFinaleEvent(hero) {
    const finaleEvent = codeRetriever.findQuest(hero.currentQuestCode).finaleEvent;
    const flavorText = takeFinalePath(finaleEvent, hero);

    return `${flavorText}`;
}

module.exports = {
    startChapterEvent,
    finishChapterEvent,
    startFinaleEvent,
    finishFinaleEvent,
}

function getHealthChangeAmount(changeMin, changeMax) {
    const damageHappens = boolUtil.allHaveValues([changeMin, changeMax])
        && changeMin >= 0
        && changeMax > 0;
    if (damageHappens) {
        return randomUtil.pickRandomNumber(changeMin, changeMax);
    } else {
        return 0;
    }
}

function applyChapterChange(path, hero) {
    const damage = getHealthChangeAmount(path.damageMin, path.damageMax);
    const heal = getHealthChangeAmount(path.healMin, path.healMax);

    let changeText;
    if (damage > 0) {
        changeText = handleDamage(hero, damage);
    } else if (heal > 0) {
        hero.hp += heal;
        changeText = `They heal ${heal}hp.`
    } else if (boolUtil.hasValue(path.item)) {
        hero.item = path.item;
        changeText = `They equip ${path.item}.`
    } else if (boolUtil.hasValue(path.ally)) {
        hero.ally = path.ally;
        changeText = `${path.ally} joins the party.`
    } else {
        changeText = "They are unaffected.";
    }
    return changeText;
}

function handleDamage(hero, damage) {
    const modifiedDamage = damage + getDamageModifier(hero.level);
    hero.hp -= modifiedDamage;
    return `They lose ${modifiedDamage}hp.`
}

function getDamageModifier(level) {
    return (level - 1) * 2;
}

function applyFinaleChange(path, hero) {
    const damage = getHealthChangeAmount(path.damageMin, path.damageMax);

    let changeText;
    if (damage > 0) {
        changeText = handleDamage(hero, damage);
    } else {
        changeText = "They are unaffected.";
    }
    return changeText;
}

function pickPath(event, hero) {
    return event.paths.find((path) => {
        return trigger.triggersActivated(path.triggers, hero);
    });
}

function takeChapterPath(chapterEvent, hero) {
    const path = pickPath(chapterEvent, hero);
    const changeText = applyChapterChange(path, hero);
    return `${path.text} ${changeText}`;
}

function takeFinalePath(chapterEvent, hero) {
    const path = pickPath(chapterEvent, hero);
    const changeText = applyFinaleChange(path, hero);
    return `${path.text} ${changeText}`;
}
