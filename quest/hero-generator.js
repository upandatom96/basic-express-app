function generateHero(pastHeroes) {
    const previousNames = getPreviousHeroNames(pastHeroes);
    const name = pickNewName(previousNames);

    console.log(`Generating HERO ${name}...`);

    const specialAbility = "BLESSED";
    const specialWeakness = "CURSED";

    const strength = 5;
    const knowledge = 5;
    const charisma = 5;
    const speed = 5;

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
        strength,
        knowledge,
        charisma,
        speed,
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
