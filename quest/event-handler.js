const randomUtil = require('../utilities/random.util');
const boolUtil = require('../utilities/bool.util');

const MoveTypes = require('../constants/quest/move-types');
const HeroMoves = require('../constants/quest/hero-moves');

const codeRetriever = require('./code-retriever');

const trigger = require('./trigger');

function finishPathEvent(hero, event) {
    const path = pickPath(event, hero);
    return endEventWithChanges(hero, path);
}

function finishChoiceEvent(hero, event) {
    const choice = randomUtil.pickRandom(event.choices);

    return endEventWithChanges(hero, choice);
}

function finishDirectEvent(hero, event) {
    return endEventWithChanges(hero, event);
}

function heroTurnEncounter(hero, event) {
    const specialMoves = codeRetriever.findSpecialMoves(hero.specialMoves);
    const availableMoves = HeroMoves.STANDARD_MOVES.concat(specialMoves);
    const move = randomUtil.pickRandom(availableMoves);

    let moveDetails = "";
    switch (move.type) {
        case MoveTypes.HEAL:
            const healAmount = rollHeal(hero, move);
            moveDetails = `heals ${healAmount} hp.`;

            hero.healBoost = 0;
            hero.hp += healAmount;
            if (hero.hp > hero.hpMax) {
                hero.hp = hero.hpMax;
            }
            break;
        case MoveTypes.STRENGTH_ATTACK:
            const strDmg = getStatDamage(hero.strength + hero.attackBoost, event.strength) * move.multiplier;
            moveDetails = `does ${strDmg} strength damage.`;

            hero.attackBoost = 0;
            hero.enemyHp -= strDmg;
            break;
        case MoveTypes.DEXTERITY_ATTACK:
            const dexDmg = getStatDamage(hero.dexterity + hero.attackBoost, event.dexterity) * move.multiplier;
            moveDetails = `does ${dexDmg} dexterity damage.`;

            hero.attackBoost = 0;
            hero.enemyHp -= dexDmg;
            break;
        case MoveTypes.WISDOM_ATTACK:
            const wisDmg = getStatDamage(hero.wisdom + hero.attackBoost, event.wisdom) * move.multiplier;
            moveDetails = `does ${wisDmg} wisdom damage.`;

            hero.attackBoost = 0;
            hero.enemyHp -= wisDmg;
            break;
        case MoveTypes.CHARISMA_ATTACK:
            const chrDmg = getStatDamage(hero.charisma + hero.attackBoost, event.charisma) * move.multiplier;
            moveDetails = `does ${chrDmg} charisma damage.`;

            hero.attackBoost = 0;
            hero.enemyHp -= chrDmg;
            break;
        case MoveTypes.FAIL:
            moveDetails = `nothing happens.`;
            break;
        default:
            console.log("INVALID MOVE TYPE " + move.type);
    }

    const enemyHealth = getEnemyHealthMessage(event, hero);
    const moveMessage = getMoveMessage(hero.name, move.name, moveDetails);
    return `${moveMessage} ${enemyHealth}`;
}

function enemyTurnEncounter(hero, event) {
    const move = randomUtil.pickRandom(event.moves);

    let moveDetails = "";
    switch (move.type) {
        case MoveTypes.HEAL:
            const healAmount = randomUtil.pickRandomNumber(1, 5) * move.multiplier;
            moveDetails = `heals ${healAmount} hp.`;

            hero.enemyHp += healAmount;
            if (hero.enemyHp > event.enemyHpMax) {
                hero.enemyHp = event.enemyHpMax;
            }
            break;
        case MoveTypes.STRENGTH_ATTACK:
            const strDmg = getStatDamage(event.strength, hero.strength + hero.defenseBoost) * move.multiplier;
            moveDetails = `does ${strDmg} strength damage.`;

            hero.defenseBoost = 0;
            hero.hp -= strDmg;
            hero.damageTakenTotal += strDmg;
            break;
        case MoveTypes.DEXTERITY_ATTACK:
            const dexDmg = getStatDamage(event.dexterity, hero.dexterity + hero.defenseBoost) * move.multiplier;
            moveDetails = `does ${dexDmg} dexterity damage.`;

            hero.defenseBoost = 0;
            hero.hp -= dexDmg;
            hero.damageTakenTotal += dexDmg;
            break;
        case MoveTypes.WISDOM_ATTACK:
            const wisDmg = getStatDamage(event.wisdom, hero.wisdom + hero.defenseBoost) * move.multiplier;
            moveDetails = `does ${wisDmg} wisdom damage.`;

            hero.defenseBoost = 0;
            hero.hp -= wisDmg;
            hero.damageTakenTotal += wisDmg;
            break;
        case MoveTypes.CHARISMA_ATTACK:
            const chrDmg = getStatDamage(event.charisma, hero.charisma + hero.defenseBoost) * move.multiplier;
            moveDetails = `does ${chrDmg} charisma damage.`;

            hero.defenseBoost = 0;
            hero.hp -= chrDmg;
            hero.damageTakenTotal += chrDmg;
            break;
        case MoveTypes.FAIL:
            moveDetails = `nothing happens.`;
            break;
        default:
            console.log("INVALID MOVE TYPE " + move.type);
    }

    const enemyHealth = getEnemyHealthMessage(event, hero);
    const moveMessage = getMoveMessage(event.enemyName, move.name, moveDetails);
    return `${moveMessage} ${enemyHealth}`;
}

function finishEncounterEvent(hero, event) {
    if (boolUtil.hasValue(event.expPoints)) {
        hero.expPoints += event.expPoints;
    }
    return event.defeat;
}

module.exports = {
    finishPathEvent,
    finishChoiceEvent,
    finishDirectEvent,
    heroTurnEncounter,
    enemyTurnEncounter,
    finishEncounterEvent,
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
        if (hero.inventory.includes(changes.item)) {
            changeText = `They already have ${changes.item}, so nothing happens.`;
        } else {
            hero.inventory.push(changes.item);
            changeText = `They put ${changes.item} in their inventory.`
        }
    } else if (boolUtil.hasValue(changes.ally)) {
        if (hero.party.includes(changes.ally)) {
            changeText = `${changes.ally} is already with them, so nothing happens.`;
        } else {
            hero.party.push(changes.ally);
            changeText = `${changes.ally} joins the party.`
        }
    } else {
        changeText = "They appear unaffected.";
    }
    if (boolUtil.hasValue(changes.expPoints)) {
        hero.expPoints += changes.expPoints;
    }
    if (boolUtil.hasValue(changes.distanceBoost)) {
        hero.distanceBoost += changes.distanceBoost;
    }
    return changeText;
}

function handleDamage(hero, damage) {
    const damageModifier = (hero.level - 1) * hero.level;
    const modifiedDamage = damage + damageModifier;
    hero.hp -= modifiedDamage;
    hero.damageTakenTotal += modifiedDamage;
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

function getEnemyHealthMessage(event, hero) {
    if (hero.enemyHp < 0) {
        hero.enemyHp = 0;
    }
    return `(${event.enemyName} ${hero.enemyHp}/${event.enemyHpMax} hp)`;
}

function getMoveMessage(characterName, moveName, moveDetails) {
    return `${characterName} uses ${moveName} and ${moveDetails}`;
}

function getStatDamage(attackerStat, defenderStat) {
    const damageDifference = (attackerStat + 1 - defenderStat);
    const min = damageDifference > 0 ? damageDifference : 0;

    const damageDifferenceCap = damageDifference + (5 + attackerStat);
    const max = damageDifferenceCap > 0 ? damageDifferenceCap : 0;

    const baseDamage = randomUtil.pickRandomNumber(min, max);
    return (baseDamage + 1) * rollCritical(5);
}

function rollCritical(chance) {
    const criticalChance = randomUtil.pickRandomNumber(1, 100);
    const hitCritical = criticalChance > (100 - chance);
    return hitCritical ? 2 : 1;
}

function rollHeal(hero, move) {
    const minHeal = 2 + hero.wisdom;
    const maxHeal = minHeal * (2 + hero.healBoost);
    return randomUtil.pickRandomNumber(minHeal, maxHeal) * move.multiplier;
}
