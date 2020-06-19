const CLUE_BASES = require('./constants/clue-bases');

const randomUtil = require('../utilities/random.util');

function createClue(clueBot, nextClue) {
    const isWeapon = clueBot.weaponOptions.includes(nextClue);
    const isScene = clueBot.sceneOptions.includes(nextClue);

    let fakeClue;
    let clueBases;

    if (isWeapon) {
        fakeClue = clueBot.fakeWeapons.shift();
        clueBases = CLUE_BASES.WEAPON_CLUE_BASES;
    } else if (isScene) {
        fakeClue = clueBot.fakeScenes.shift();
        clueBases = CLUE_BASES.SCENE_CLUE_BASES;
    } else {
        fakeClue = clueBot.fakeCulprits.shift();
        clueBases = CLUE_BASES.CULPRIT_CLUE_BASES;
    }

    return randomizeClue(clueBases, nextClue, fakeClue);
}

module.exports = {
    createClue
}

function randomizeClue(clueDescriptions, realClue, fakeClue) {
    const clues = randomUtil.shuffleArray([realClue, fakeClue]);
    const clueOne = clues[0];
    const clueTwo = clues[1];
    let chosenDescription = randomUtil.pickRandom(clueDescriptions);
    chosenDescription = chosenDescription.replace("{CLUE}", realClue);
    chosenDescription = chosenDescription.replace("{CLUE1}", clueOne);
    chosenDescription = chosenDescription.replace("{CLUE2}", clueTwo);
    return chosenDescription;
}
