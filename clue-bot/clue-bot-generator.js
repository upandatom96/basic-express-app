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

    const allCulprits = culpritSelector.selectCulprits(7);
    const allScenes = sceneSelector.selectScenes(6);
    const allWeapons = weaponSelector.selectWeapons(6);

    const victimName = allCulprits.shift();

    const culpritOptions = allCulprits;
    const sceneOptions = allScenes;
    const weaponOptions = allWeapons;

    const culpritName = allCulprits.shift();
    const sceneName = allScenes.shift();
    const weaponName = allWeapons.shift();

    const unDrawnClues = shuffleCluesTogether(allCulprits, allScenes, allWeapons);

    return {
        status: 0,
        title: title,
        drawnClues: [],
        victim: victimName,
        culprit: culpritName,
        scene: sceneName,
        weapon: weaponName,
        unDrawnClues: unDrawnClues,
        weaponOptions: weaponOptions,
        sceneOptions: sceneOptions,
        culpritOptions: culpritOptions,
    };
}

module.exports = {
    generateClueBotDetails
}
