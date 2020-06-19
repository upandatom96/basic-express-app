const SCENE_CONSTANTS = require("./constants/scenes");
const CULPRITS_CONSTANTS = require("./constants/culprits");
const WEAPONS_CONSTANTS = require("./constants/weapons");
const TITLE_CONSTANTS = require("./constants/title-pieces");

const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

function makeRandomTitle() {
    const adjective = stringUtil.toTitleCase(randomManager.pickAdjective());
    const name = randomUtil.pickRandom(TITLE_CONSTANTS.MANOR_NAMES);
    const type = randomUtil.pickRandom(TITLE_CONSTANTS.MANOR_TYPES);
    const mystery = randomUtil.pickRandom(TITLE_CONSTANTS.MYSTERY_SYNONYMS);
    return `The ${adjective} ${mystery} at the ${name} ${type}`;
}

function pickNewTitle(previousTitles) {
    let foundNewTitle = false;
    let potentialTitle;
    while (!foundNewTitle) {
        potentialTitle = makeRandomTitle();
        if (!previousTitles.includes(potentialTitle)) {
            foundNewTitle = true;
        }
    }
    return potentialTitle;
}

function shuffleCluesTogether(allCharacters, allScenes, allWeapons) {
    const combinedClues = allCharacters.concat(allScenes).concat(allWeapons);
    return randomUtil.shuffleArray(combinedClues);
}

function generateClueBotDetails(pastClueBots) {
    const previousTitles = getPreviousTitles(pastClueBots);
    const title = pickNewTitle(previousTitles);

    console.log(`Generating ${title}...`);

    const randomCulprits = randomUtil.drawNItems(CULPRITS_CONSTANTS.CULPRITS, 13);
    const randomScenes = randomUtil.drawNItems(SCENE_CONSTANTS.SCENES, 12);
    const randomWeapons = randomUtil.drawNItems(WEAPONS_CONSTANTS.WEAPONS, 12);

    // unlucky 13 is killed
    const victim = randomCulprits[12];

    // first 6 are red herrings
    const fakeCulprits = randomCulprits.slice(0, 6);
    const fakeScenes = randomScenes.slice(0, 6);
    const fakeWeapons = randomWeapons.slice(0, 6);

    // second 6 are suspicious
    const allCulprits = randomCulprits.slice(6, 12);
    const allScenes = randomScenes.slice(6, 12);
    const allWeapons = randomWeapons.slice(6, 12);

    // first of each is picked off as the real scenario
    const culprit = allCulprits.shift();
    const scene = allScenes.shift();
    const weapon = allWeapons.shift();

    const clues = shuffleCluesTogether(allCulprits, allScenes, allWeapons);

    const culpritOptions = randomUtil.shuffleArray(allCulprits.concat(culprit));
    const sceneOptions = randomUtil.shuffleArray(allScenes.concat(scene));
    const weaponOptions = randomUtil.shuffleArray(allWeapons.concat(weapon));

    return {
        title,
        victim,
        culprit,
        scene,
        weapon,
        clues,
        weaponOptions,
        sceneOptions,
        culpritOptions,
        fakeCulprits,
        fakeWeapons,
        fakeScenes
    };
}

module.exports = {
    generateClueBotDetails
}

function getPreviousTitles(clueBots) {
    const previousTitles = [];
    clueBots.forEach((clueBot) => {
        previousTitles.push(clueBot.title);
    });
    return previousTitles;
}
