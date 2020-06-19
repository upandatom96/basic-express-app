const randomManager = require('../random/random.manager');

function generateClueBotDetails() {
    console.log("Generating mystery...");

    const allCharacters = [
        "Character One",
        "Character Two",
        "Character Three",
        "Character Four",
        "Character Five",
        "Character Six",
        "Character Seven",
    ];
    const allScenes = [
        "Scene One",
        "Scene Two",
        "Scene Three",
        "Scene Four",
        "Scene Five",
        "Scene Six",
    ];
    const allWeapons = [
        "Weapon One",
        "Weapon Two",
        "Weapon Three",
        "Weapon Four",
        "Weapon Five",
        "Weapon Six",
    ];
    const title = randomManager.pickAdjective();

    const victimName = allCharacters.shift();
    const culpritName = allCharacters.shift();
    const sceneName = allScenes.shift();

    const weaponName = allWeapons.shift();

    const unDrawnClues = allCharacters.concat(allScenes).concat(allWeapons);

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
