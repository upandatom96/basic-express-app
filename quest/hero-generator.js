const randomUtil = require('../utilities/random.util');
const randomManager = require('../random/random.manager');

function generateHero(firstName, pastHeroes) {
    const previousNames = getPreviousHeroNames(pastHeroes);
    const name = pickNewName(firstName, previousNames);

    console.log(`Generating HERO ${name}...`);

    const seed = randomUtil.pickRandomNumber(0, 100);
    const advantage = randomManager.pickAdvantage();
    const disadvantage = randomManager.pickDisadvantage();
    const backstory = randomManager.pickBackstory();
    const specialMove = randomManager.pickSpecialMove();
    const stats = rollStats();

    const status = 0;
    const hp = 100;
    const hpMax = 100;
    const level = 1;
    const inventory = [];
    const party = [];
    const journal = [];
    const currentQuestCode = null;
    const distanceTravelled = 0;
    const completedQuestCodeLog = [];
    const completedChapterCodeLog = [];
    const specialMoveCodes = [specialMove.code];

    return {
        name,
        seed,
        status,
        backstory,
        advantage,
        disadvantage,
        specialMoveCodes,
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
        currentQuestCode,
        distanceTravelled,
        completedQuestCodeLog,
        completedChapterCodeLog,
    };
}

module.exports = {
    generateHero
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

function rollStats() {
    let strength = 1;
    let wisdom = 1;
    let charisma = 1;
    let dexterity = 1;

    for (let i = 16; i > 0; i--) {
        const categoryNumber = randomUtil.pickRandomNumber(1, 4);
        switch (categoryNumber) {
            case 1:
                strength++;
                break;
            case 2:
                wisdom++;
                break;
            case 3:
                charisma++;
                break;
            case 4:
                dexterity++
                break;
        }
    }

    return {
        strength,
        wisdom,
        charisma,
        dexterity
    };
}
