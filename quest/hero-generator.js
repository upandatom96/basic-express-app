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

    return {
        name,
        status,
        backstory,
        specialAbility,
        specialWeakness,
        strength: stats.strength,
        knowledge: stats.knowledge,
        charisma: stats.charisma,
        speed: stats.speed,
        hp,
        hpMax,
        level,
        item,
        ally,
        journal
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
    let knowledge = 1;
    let charisma = 1;
    let speed = 1;

    for (let i = 16; i > 0; i--) {
        const categoryNumber = randomUtil.pickRandomNumber(1, 4);
        switch (categoryNumber) {
            case 1:
                strength++;
                break;
            case 2:
                knowledge++;
                break;
            case 3:
                charisma++;
                break;
            case 4:
                speed++
                break;
        }
    }

    return {
        strength,
        knowledge,
        charisma,
        speed
    };
}
