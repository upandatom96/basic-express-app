const constants = require('../constants/constants.manager');

const randomUtil = require('../utilities/random.util');

function buildWeaponClues(realWeapons, fakeWeapons) {
    return buildFullClues(constants.CLUE_BASES.WEAPON_CLUE_BASES, realWeapons, fakeWeapons);
}

function buildSceneClues(realScenes, fakeScenes) {
    return buildFullClues(constants.CLUE_BASES.SCENE_CLUE_BASES, realScenes, fakeScenes);
}

function buildCulpritClues(realCulprits, fakeCulprits) {
    return buildFullClues(constants.CLUE_BASES.CULPRIT_CLUE_BASES, realCulprits, fakeCulprits);
}

module.exports = {
    buildWeaponClues,
    buildSceneClues,
    buildCulpritClues
}

function fillClueBase(clueBase, realClue, fakeClue) {
    const clues = randomUtil.shuffleArray([realClue, fakeClue]);
    const clueOne = clues[0];
    const clueTwo = clues[1];
    clueBase = clueBase.replace("{CLUE}", realClue);
    clueBase = clueBase.replace("{CLUE1}", clueOne);
    clueBase = clueBase.replace("{CLUE2}", clueTwo);
    return clueBase;
}

function buildFullClues(clueBases, realItems, fakeItems) {
    const fullClues = [];
    const shuffledBases = randomUtil.shuffleArray(clueBases);
    realItems.forEach((realItem) => {
        const fakeItem = fakeItems.shift();
        const clueBase = shuffledBases.shift();
        const fullClue = fillClueBase(clueBase, realItem, fakeItem);
        fullClues.push(fullClue);
    });
    return fullClues;
}
