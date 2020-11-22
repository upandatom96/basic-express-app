const nameyManager = require('../api-connector/namey.connector');
const randomUtil = require('../utilities/random.util');
const randomManager = require('../random/random.manager');

async function getRandomCharacter() {
    try {
        return {
            name: await getName(),
            gender: getGender(),
            alignment: getAlignment(),
            race: "",
            title: "",
            age: "",
            height: "",
            weight: "",
            hobby: "",
            occupation: "",
            favoriteColor: "",
            traits: [],
            dndStats: getDndStats(),
            additionalStats: getAdditionalStats(),
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
    return randomUtil.pickRandom(["male","male", "male", "female","female", "female", "unknown", "non-binary"]);
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
    };
}
