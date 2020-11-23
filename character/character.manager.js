const nameyManager = require('../api-connector/namey.connector');
const randomUtil = require('../utilities/random.util');
const randomManager = require('../random/random.manager');
const characterRoller = require('../character/character.roller');

async function getGenericCharacter() {
    try {
        return {
            name: await nameyManager.findRandomCharacterName(),
            type: "generic character",
            descriptor: randomManager.getOneAdjective(),
            gender: getGender(),
            favoriteColor: randomManager.pickColor(),
            age: getAge(),
            alignment: getAlignment(),
            traits: getTraits(),
            height: getHeight(),
            weight: getWeight(),
            // hobby: getHobby(),
            // story: getStory(),
            // secret: getSecret(),
            // inventory: getInventory(),
            // home: "",
            // equipment: "",
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getQuestBotEnemy() {
    try {
        const character = await getGenericCharacter();
        character.type = "quest bot enemy"
        character.stats = characterRoller.rollStats();
        character.hpMax = randomUtil.pickRandomNumber(15,35);
        character.hpStart = character.hpMax - randomUtil.pickRandomNumber(0,5);
        character.expGain = character.hpMax + randomUtil.pickRandomNumber(0,10);
        character.intro = null;
        character.defeat = null;
        character.moves = [];
        character.enemyType = characterRoller.chooseEnemyType();
        character.appearance = `${character.descriptor} ${character.enemyType}`;
        return character;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getNpc() {
    try {
        const character = await getGenericCharacter();
        character.type = "non-playable character";
        setupCharacterBasics(character);
        character.demeanor = characterRoller.chooseDemeanor();
        return character;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getPc() {
    try {
        const character = await getGenericCharacter();
        character.type = "playable character";
        setupCharacterBasics(character);
        character.experience = 0;
        return character;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getGenericCharacter,
    getQuestBotEnemy,
    getNpc,
    getPc,
};

function setupCharacterBasics(character) {
    character.hpMax = "";
    character.hpCurrent = "";
    character.dndStats = null;
    character.additionalStats = null;
    character.race = randomManager.pickRace().toLowerCase();
    character.occupation = getOccupation();
    character.title = getTitle();
    character.class = "";
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
    const goodVsEvil = characterRoller.chooseGoodVsEvil();
    const lawVsChaos = characterRoller.chooseLawVsChaos();
    return characterRoller.getFullAlignment(goodVsEvil, lawVsChaos);
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
    const weight = randomUtil.pickRandomNumber(100, 300);
    return `${weight} lbs`;
}

function getHeight() {
    const foot = randomUtil.pickRandom(["4","5","5","5","5","6"]);
    const inches = randomUtil.pickRandom(["0","1","2","3","4","6","7","8","9","10","11"]);
    return `${foot} foot ${inches} inches`;
}
