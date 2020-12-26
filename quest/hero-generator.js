const randomUtil = require('../utilities/random.util');
const randomManager = require('../random/random.manager');
const characterRoller = require('../character/character.roller');

function generateHero(firstName, pastHeroes) {
    const previousNames = getPreviousHeroNames(pastHeroes);
    const name = pickNewName(firstName, previousNames);

    console.log(`Generating HERO ${name}...`);

    const seed = randomUtil.pickRandomNumber(0, 100);
    const race = randomManager.pickRace();
    const alignmentLawVsChaos = randomUtil.pickRandom(["LAWFUL", "NEUTRAL", "CHAOTIC"]);
    const alignmentGoodVsEvil = randomUtil.pickRandom(["GOOD", "NEUTRAL", "EVIL"]);
    const advantage = randomManager.pickAdvantage();
    const disadvantage = randomManager.pickDisadvantage();
    const specialMove = randomManager.pickSpecialMove();
    const stats = characterRoller.rollStats();

    const status = 0;
    const hp = 100;
    const hpMax = 100;
    const level = 1;
    const inventory = [randomManager.pickStarterItem()];
    const party = [randomManager.pickStarterAlly()];
    const specialAdjective = randomManager.pickAdjective();
    const journal = [];
    const currentQuestName = null;
    const distanceTravelled = 0;
    const completedQuestLog = [];
    const completedChapterLog = [];
    const specialMoves = [specialMove.name];
    const creator = null;

    const randomAdjective = randomManager.getOneAdjective();
    const randomNoun = randomManager.getOneNoun();

    return {
        name,
        race,
        alignmentLawVsChaos,
        alignmentGoodVsEvil,
        creator,
        seed,
        status,
        advantage,
        disadvantage,
        specialAdjective,
        randomAdjective,
        randomNoun,
        path: null,
        specialMoves,
        strength: stats.strength,
        wisdom: stats.wisdom,
        charisma: stats.charisma,
        dexterity: stats.dexterity,
        hp,
        hpMax,
        level,
        inventory,
        party,
        journal,
        currentQuestName,
        distanceTravelled,
        completedQuestLog,
        completedChapterLog,
    };
}

module.exports = {
    generateHero,
}

function pickNewName(firstName, previousNames) {
    let foundNewName = false;
    let potentialName;
    while (!foundNewName) {
        const lastName = randomManager.pickLastName();
        potentialName = firstName + " " + lastName;
        if (!previousNames.includes(potentialName)) {
            foundNewName = true;
        }
    }
    return potentialName;
}

function getPreviousHeroNames(previousHeroes) {
    const previousNames = [];
    previousHeroes.forEach((hero) => {
        previousNames.push(hero.name);
    });
    return previousNames;
}
