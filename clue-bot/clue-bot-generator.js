const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

const culpritSelector = require('./culprit-selector');
const sceneSelector = require('./scene-selector');
const weaponSelector = require('./weapon-selector');

function makeTitle() {
    const adjective = stringUtil.toTitleCase(randomManager.pickAdjective());
    return `The ${adjective} Mystery`;
}

function shuffleCluesTogether(allCharacters, allScenes, allWeapons) {
    const combinedClues = allCharacters.concat(allScenes).concat(allWeapons);
    return randomUtil.shuffleArray(combinedClues);
}

function generateClueBotDetails() {
    const title = makeTitle();

    console.log(`Generating ${title}...`);

    const randomCulprits = culpritSelector.selectCulprits(13);
    const randomScenes = sceneSelector.selectScenes(12);
    const randomWeapons = weaponSelector.selectWeapons(12);

    // unlucky 13 is killed
    const victim = randomCulprits[13];

    // first 6 are red herrings
    const fakeCulprits = randomCulprits.slice(0, 6);
    const fakeScenes = randomScenes.slice(0, 6);
    const fakeWeapons = randomWeapons.slice(0, 6);

    // second 6 are suspicious
    const allCulprits = randomCulprits.slice(6,12);
    const allScenes = randomScenes.slice(6,12);
    const allWeapons = randomWeapons.slice(6,12);

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
