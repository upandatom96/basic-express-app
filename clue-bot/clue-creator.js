const randomUtil = require('../utilities/random.util');

function createClue(clueBot, nextClue) {
    const isWeapon = clueBot.weaponOptions.includes(nextClue);
    const isScene = clueBot.sceneOptions.includes(nextClue);

    if (isWeapon) {
        const fakeClue = clueBot.fakeWeapons.shift();
        return provideWeaponClue(nextClue, fakeClue);
    } else if (isScene) {
        const fakeClue = clueBot.fakeScenes.shift();
        return provideSceneClue(nextClue, fakeClue);
    } else {
        const fakeClue = clueBot.fakeCulprits.shift();
        return provideCulpritClue(nextClue, fakeClue);
    }
}

module.exports = {
    createClue
}

function provideCulpritClue(nextClue, fakeClue) {
    const randomNumber = randomUtil.pickRandom([1, 2, 3, 4, 5]);
    if (randomNumber === 1) {
        return `${nextClue} and ${fakeClue} were talking at the time of the murder`;
    } else if (randomNumber === 2) {
        return `${nextClue} and ${fakeClue} were asleep at the time of the murder`;
    } else if (randomNumber === 3) {
        return `${nextClue} and ${fakeClue} were performing at the time of the murder`;
    } else if (randomNumber === 4) {
        return `${nextClue} and ${fakeClue} were committing unrelated crimes at the time of the murder`;
    } else {
        return `${nextClue} and ${fakeClue} were kissing at the time of the murder`;
    }
}

function provideSceneClue(nextClue, fakeClue) {
    const randomNumber = randomUtil.pickRandom([1, 2, 3, 4, 5]);
    if (randomNumber === 1) {
        return `${nextClue} and ${fakeClue} were empty at the time of the murder`;
    } else if (randomNumber === 2) {
        return `${nextClue} and ${fakeClue} were being cleaned at the time of the murder`;
    } else if (randomNumber === 3) {
        return `${nextClue} and ${fakeClue} were under surveillance at the time of the murder`;
    } else if (randomNumber === 4) {
        return `${nextClue} and ${fakeClue} were full of party-goers at the time of the murder`;
    } else {
        return `${nextClue} and ${fakeClue} were locked at the time of the murder`;
    }
}

function provideWeaponClue(nextClue, fakeClue) {
    const randomNumber = randomUtil.pickRandom([1, 2, 3, 4, 5]);
    if (randomNumber === 1) {
        return `${nextClue} and ${fakeClue} were locked away at the time of the murder`;
    } else if (randomNumber === 2) {
        return `${nextClue} and ${fakeClue} were being used by party-goers at the time of the murder`;
    } else if (randomNumber === 3) {
        return `${nextClue} and ${fakeClue} were on display at the time of the murder`;
    } else if (randomNumber === 4) {
        return `${nextClue} and ${fakeClue} were not near the home at the time of the murder`;
    } else {
        return `${nextClue} and ${fakeClue} were being used by staff at the time of the murder`;
    }
}
