const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

function makeTitle() {
    const adjective = stringUtil.toTitleCase(randomManager.pickAdjective());
    return `The ${adjective} Mystery`;
}

function selectWeapons() {
    return [
        "Weapon One",
        "Weapon Two",
        "Weapon Three",
        "Weapon Four",
        "Weapon Five",
        "Weapon Six",
    ];
}

function selectScenes() {
    return [
        "Scene One",
        "Scene Two",
        "Scene Three",
        "Scene Four",
        "Scene Five",
        "Scene Six",
    ];
}

function selectCharacters() {
    return [
        "Character One",
        "Character Two",
        "Character Three",
        "Character Four",
        "Character Five",
        "Character Six",
        "Character Seven",
    ];
}

function shuffleCluesTogether(allCharacters, allScenes, allWeapons) {
    const combinedClues = allCharacters.concat(allScenes).concat(allWeapons);
    return randomUtil.shuffleArray(combinedClues);
}

function generateClueBotDetails() {
    const title = makeTitle();

    console.log(`Generating ${title}...`);

    const allCharacters = selectCharacters();
    const allScenes = selectScenes();
    const allWeapons = selectWeapons();

    const victimName = allCharacters.shift();
    const culpritName = allCharacters.shift();
    const sceneName = allScenes.shift();
    const weaponName = allWeapons.shift();

    const unDrawnClues = shuffleCluesTogether(allCharacters, allScenes, allWeapons);

    return {
        concluded: false,
        title: title,
        drawnClues: [],
        victim: victimName,
        culprit: culpritName,
        scene: sceneName,
        weapon: weaponName,
        unDrawnClues: unDrawnClues,
    };
}

module.exports = {
    generateClueBotDetails
}
