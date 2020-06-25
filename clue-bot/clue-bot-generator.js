const constants = require("../constants/constants.manager");

const clueCreator = require("./clue-creator");

const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

function makeRandomTitle() {
    const adjective = stringUtil.toTitleCase(randomManager.pickAdjective());
    const name = randomUtil.pickRandom(constants.TITLE_BASES.MANOR_NAMES);
    const type = randomUtil.pickRandom(constants.TITLE_BASES.MANOR_TYPES);
    const mystery = randomUtil.pickRandom(constants.TITLE_BASES.MYSTERY_SYNONYMS);
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

function makeClueDeck(allWeapons, fakeWeapons, allScenes, fakeScenes, allCulprits, fakeCulprits) {
    const fullWeaponClues = clueCreator.buildWeaponClues(allWeapons, fakeWeapons);
    const fullSceneClues = clueCreator.buildSceneClues(allScenes, fakeScenes);
    const fullCulpritClues = clueCreator.buildCulpritClues(allCulprits, fakeCulprits);
    return shuffleCluesTogether(fullCulpritClues, fullSceneClues, fullWeaponClues);
}

function scrubManorName(title) {
    const manorNamePieces = title.split(" ").splice(-2);
    return manorNamePieces[0] + " " + manorNamePieces[1];
}

function generateClueBotDetails(pastClueBots) {
    const previousTitles = getPreviousTitles(pastClueBots);
    const title = pickNewTitle(previousTitles);
    const manor = scrubManorName(title);

    console.log(`Generating ${title}...`);

    const randomCulprits = randomUtil.drawNItems(constants.CULPRITS, 13);
    const randomScenes = randomUtil.drawNItems(constants.SCENES, 12);
    const randomWeapons = randomUtil.drawNItems(constants.WEAPONS, 12);

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

    const clues = makeClueDeck(allWeapons, fakeWeapons, allScenes, fakeScenes, allCulprits, fakeCulprits);

    const culpritOptions = randomUtil.shuffleArray(allCulprits.concat(culprit));
    const sceneOptions = randomUtil.shuffleArray(allScenes.concat(scene));
    const weaponOptions = randomUtil.shuffleArray(allWeapons.concat(weapon));

    return {
        title,
        victim,
        culprit,
        manor,
        scene,
        weapon,
        clues,
        weaponOptions,
        sceneOptions,
        culpritOptions
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
