const randomUtil = require('../utilities/random.util');

function generateHero(pastHeroes) {
    const previousNames = getPreviousHeroNames(pastHeroes);
    const name = pickNewName(previousNames);

    console.log(`Generating HERO ${name}...`);

    const specialAbility = "BLESSED";
    const specialWeakness = "CURSED";
    const stats = rollStats();

    const hp = 100;
    const hpMax = 100;
    const level = 1;
    const storyOver = false;
    const item = null;
    const ally = null;
    const journal = [];

    return {
        name,
        specialAbility,
        specialWeakness,
        strength: stats.strength,
        knowledge: stats.knowledge,
        charisma: stats.charisma,
        speed: stats.speed,
        hp,
        hpMax,
        level,
        storyOver,
        item,
        ally,
        journal
    };
}

module.exports = {
    generateHero
}

function pickNewName(previousNames) {
    return "Alex the Hero";
    // let foundNewName = false;
    // let potentialName;
    // while (!foundNewName) {
    //     potentialName = makeRandomName();
    //     if (!previousNames.includes(potentialName)) {
    //         foundNewName = true;
    //     }
    // }
    // return potentialName;
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
