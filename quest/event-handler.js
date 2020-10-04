const randomUtil = require('../utilities/random.util');
const boolUtil = require('../utilities/bool.util');
const randomManager = require('../random/random.manager');

const codeRetriever = require('./code-retriever');
const trigger = require('./trigger');

function concludeChapter(hero) {
    const chapterEvent = codeRetriever.findChapterEvent(hero.currentChapterCode);
    hero.completedChapterCodeLog.push(hero.currentChapterCode);
    hero.currentChapterCode = null;
    return chapterEvent;
}

function startChapterEvent(hero) {
    const chapterEvent = randomManager.pickChapterEvent();
    hero.currentChapterCode = chapterEvent.code;

    return chapterEvent;
}

function finishPathEvent(hero) {
    const chapterEvent = concludeChapter(hero);
    return takeChapterPath(chapterEvent, hero);
}

function finishChoiceEvent(hero) {
    const chapterEvent = concludeChapter(hero);
    return takeChapterChoice(chapterEvent, hero);
}

function finishDirectEvent(hero) {
    const chapterEvent = concludeChapter(hero);
    return takeChapterDirect(chapterEvent, hero);
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
    finishPathEvent,
    finishChoiceEvent,
    finishDirectEvent,
    concludeChapter,
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

function applyChanges(changes, hero) {
    const damage = getHealthChangeAmount(changes.damageMin, changes.damageMax);
    const heal = getHealthChangeAmount(changes.healMin, changes.healMax);

    let changeText;
    if (damage > 0) {
        changeText = handleDamage(hero, damage);
    } else if (heal > 0) {
        hero.hp += heal;
        changeText = `They heal ${heal}hp.`
    } else if (boolUtil.hasValue(changes.item)) {
        hero.item = changes.item;
        changeText = `They equip ${changes.item}.`
    } else if (boolUtil.hasValue(changes.ally)) {
        hero.ally = changes.ally;
        changeText = `${changes.ally} joins the party.`
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

function pickPath(event, hero) {
    return event.paths.find((path) => {
        return trigger.triggersActivated(path.triggers, hero);
    });
}

function takeChapterPath(chapterEvent, hero) {
    const path = pickPath(chapterEvent, hero);
    const changeText = applyChanges(path, hero);
    return `${path.text} ${changeText}`;
}

function takeChapterChoice(chapterEvent, hero) {
    const choice = randomUtil.pickRandom(chapterEvent.choices);
    const changeText = applyChanges(choice, hero);
    return `${choice.text} ${changeText}`;
}

function takeChapterDirect(chapterEvent, hero) {
    const changeText = applyChanges(chapterEvent, hero);
    return `${chapterEvent.text} ${changeText}`;
}

function takeFinalePath(chapterEvent, hero) {
    const path = pickPath(chapterEvent, hero);
    const changeText = applyChanges(path, hero);
    return `${path.text} ${changeText}`;
}
