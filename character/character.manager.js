const nameyManager = require('../api-connector/namey.connector');
const randomUtil = require('../utilities/random.util');
const randomManager = require('../random/random.manager');

async function getRandomCharacter() {
    try {
        return {
            // all characters
            name: await getName(),
            gender: getGender(),
            favoriteColor: randomManager.pickColor(),
            traits: getTraits(),
            dndStats: getDndStats(),
            additionalStats: getAdditionalStats(),
            age: getAge(),
            alignment: getAlignment(),
            religion: getReligion(),
            height: getHeight(),
            weight: getWeight(),
            hobby: getHobby(),
            story: getStory(),
            secret: getSecret(),
            inventory: getInventory(),
            home: "",
            equipment: "",
            maxHealth: "",
            currentHealth: "",
            moves: [],
            wealth: getWealth(),
            race: randomManager.pickRace().toLowerCase(),
            // npc or pc
            occupation: getOccupation(),
            title: getTitle(),
            class: "",
            // npc only
            demeanor: "",
            // pc only
            experience: "",
            // enemy only
            descriptor: "", // angry (descriptor + race = enemy type)
            questExpGain: "", // +20exp
            questStats: "", // roll stats for quest bot
            questHealth: "", // roll health for quest bot
            questIntro: "", // what to say on intro
            questDefeat: "", // what to say on defeat
            questMoves: [], // use descriptor
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getRandomCharacter,
};

async function getName() {
    const names = await nameyManager.findRareNames(1, true);
    return names[0];
}

function getGender() {
    return randomUtil.pickRandom(["male", "male", "male", "female", "female", "female", "unknown", "non-binary"]);
}

function getTitle() {
    return randomUtil.pickRandom([
        "", "", "", "", "", "", "", "", "", "", "", "",
        "Doctor", "Professor", "The Honorable", "The Infamous",
    ]);
}

function getAge() {
    return randomUtil.pickRandomNumber(18, 81);
}

function getAlignment() {
    const isUnaligned = randomManager.rollDie(20) === "20";
    if (isUnaligned) {
        return "unaligned";
    }
    const goodVsEvil = getAlignmentGoodVsEvil();
    const lawVsChaos = getAlignmentLawVsChaos();
    if (goodVsEvil === "neutral" && lawVsChaos === "neutral") {
        return "true neutral";
    }
    return `${lawVsChaos} ${goodVsEvil}`;
}

function getAlignmentLawVsChaos() {
    return randomUtil.pickRandom(["lawful", "neutral", "chaotic"]);
}

function getAlignmentGoodVsEvil() {
    return randomUtil.pickRandom(["good", "neutral", "evil"]);
}

function getTraits() {
    return [
        randomManager.pickAdvantage().toLowerCase(),
        randomManager.pickDisadvantage().toLowerCase(),
        randomManager.pickAdjective(),
        randomManager.pickAdjective(),
        randomManager.pickAdjective(),
    ];
}

function getDndStats() {
    // TODO roll stats
    return {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    };
}

function getAdditionalStats() {
    // TODO roll stats
    return {
        courage: 0,
        speed: 0,
    };
}

function getSecret() {
    return "They are the king's secret child.";
}

function getInventory() {
    return [];
}

function getWealth() {
    return "100 silver";
}

function getStory() {
    return "They lost their memory.";
}

function getOccupation() {
    return "";
}

function getHobby() {
    return "";
}

function getWeight() {
    return "";
}

function getHeight() {
    return "";
}

function getReligion() {
    return "";
}
