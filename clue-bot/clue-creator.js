const randomUtil = require('../utilities/random.util');

const CULPRIT_CLUE_BASES = [
    `{CLUE1} and {CLUE2} were talking at the time of the murder`,
    `{CLUE1} and {CLUE2} were asleep at the time of the murder`,
    `{CLUE1} was singing a duet with {CLUE2} at the time of the murder`,
    `{CLUE1} and {CLUE2} were committing unrelated crimes at the time of the murder`,
    `{CLUE1} was kissing {CLUE2} at the time of the murder`,
    `{CLUE} was locked in a closet all night`,
    `{CLUE} never showed up to the party`,
    `{CLUE} passed out before the murder occurred`,
];

const SCENE_CLUE_BASES = [
    `{CLUE1} and {CLUE2} were empty at the time of the murder`,
    `{CLUE1} and {CLUE2} were being cleaned at the time of the murder`,
    `{CLUE1} and {CLUE2} were under surveillance at the time of the murder`,
    `{CLUE1} and {CLUE2} were full of party-goers at the time of the murder`,
    `{CLUE1} and {CLUE2} were locked at the time of the murder`,
    `{CLUE} was closed for remodelling all night`,
    `{CLUE} is a holy space not fit for murder`,
    `{CLUE} would have been too obvious a place for a murder`,
];

const WEAPON_CLUE_BASES = [
    `{CLUE1} and {CLUE2} were locked away at the time of the murder`,
    `{CLUE1} and {CLUE2} were being used by party-goers at the time of the murder`,
    `{CLUE1} and {CLUE2} were on display at the time of the murder`,
    `{CLUE1} and {CLUE2} were not near the home at the time of the murder`,
    `{CLUE1} and {CLUE2} were being used by staff at the time of the murder`,
    `{CLUE} was in plain sight all night long`,
    `{CLUE} was being guarded by a dog all night`,
];

function createClue(clueBot, nextClue) {
    const isWeapon = clueBot.weaponOptions.includes(nextClue);
    const isScene = clueBot.sceneOptions.includes(nextClue);

    let fakeClue;
    let clueBases;

    if (isWeapon) {
        fakeClue = clueBot.fakeWeapons.shift();
        clueBases = WEAPON_CLUE_BASES;
    } else if (isScene) {
        fakeClue = clueBot.fakeScenes.shift();
        clueBases = SCENE_CLUE_BASES;
    } else {
        fakeClue = clueBot.fakeCulprits.shift();
        clueBases = CULPRIT_CLUE_BASES;
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
