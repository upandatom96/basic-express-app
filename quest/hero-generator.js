const randomUtil = require('../utilities/random.util');
const randomManager = require('../random/random.manager');

function generateHero(firstName, pastHeroes) {
    const previousNames = getPreviousHeroNames(pastHeroes);
    const name = pickNewName(firstName, previousNames);

    console.log(`Generating HERO ${name}...`);

    const specialAbility = randomManager.pickAbility();
    const specialWeakness = randomManager.pickWeakness();
    const backstory = randomManager.pickBackstory();
    const stats = rollStats();

    const status = 0;
    const hp = 100;
    const hpMax = 100;
    const level = 1;
    const item = null;
    const ally = null;
    const journal = [];
    const currentQuestCode = null;
    const distanceTravelled = 0;
    const completedQuestCodeLog = [];

    return {
        name,
        status,
        backstory,
        specialAbility,
        specialWeakness,
        strength: stats.strength,
        wisdom: stats.wisdom,
        charisma: stats.charisma,
        dexterity: stats.dexterity,
        hp,
        hpMax,
        level,
        item,
        ally,
        journal,
        currentQuestCode,
        distanceTravelled,
        completedQuestCodeLog,
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
