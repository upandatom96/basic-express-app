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

function startFinaleEvent(hero) {
    return codeRetriever.findQuest(hero.currentQuestCode).finaleEvent;
}

function finishPathEvent(hero) {
    const event = codeRetriever.findChapterEvent(hero.currentChapterCode);
    const path = pickPath(event, hero);

    return endEventWithChanges(hero, path);
}

function finishFinalePathEvent(hero) {
    const finaleEvent = codeRetriever.findQuest(hero.currentQuestCode).finaleEvent;
    const path = pickPath(finaleEvent, hero);
    return endEventWithChanges(hero, path);
}

function finishChoiceEvent(hero) {
    const chapterEvent = codeRetriever.findChapterEvent(hero.currentChapterCode);
    const choice = randomUtil.pickRandom(chapterEvent.choices);

    return endEventWithChanges(hero, choice);
}

function finishDirectEvent(hero) {
    const chapterEvent = codeRetriever.findChapterEvent(hero.currentChapterCode);
    return endEventWithChanges(hero, chapterEvent);
}

module.exports = {
    startChapterEvent,
    finishPathEvent,
    finishChoiceEvent,
    finishDirectEvent,
    startFinaleEvent,
    finishFinalePathEvent,
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
    const damageModifier = (hero.level - 1) * 2;
    const modifiedDamage = damage + damageModifier;
    hero.hp -= modifiedDamage;
    return `They lose ${modifiedDamage}hp.`
}

function pickPath(event, hero) {
    return event.paths.find((path) => {
        return trigger.triggersActivated(path.triggers, hero);
    });
}

function endEventWithChanges(hero, changeDetails) {
    const changeText = applyChanges(changeDetails, hero);
    return `${changeDetails.text} ${changeText}`;
}
