const randomUtil = require('../utilities/random.util');
const tweetManager = require('../tweet/tweet.manager');

function makeFinalRevealAnnouncement(clueBot) {
    makeAnnouncement(`THE END. ${clueBot.victim} was killed by ${clueBot.culprit} in ${clueBot.scene} with ${clueBot.weapon}!`);
}

function makePenultimateAnnouncement(clueBot) {
    makeAnnouncement(`The truth of ${clueBot.title} is about to be revealed! Make your guesses now! Who? Where? How?`);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const clueAnnouncement = buildClueDescription(clueBot, nextClue);
    const part = 15 - clueBot.clues.length;
    makeAnnouncement(`Clue #${part}: ${clueAnnouncement}`);
}

function makeCrimeAnnouncement(clueBot) {
    makeAnnouncement(`${clueBot.title} begins... ${clueBot.victim} has been killed! Who did it? Where? How?`);
}

function makeSuspectOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.culpritOptions);
    makeAnnouncement("The potential culprits are: " + optionText);
}

function makeWeaponOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.weaponOptions);
    makeAnnouncement("The potential weapons are: " + optionText);
}

function makeSceneOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.sceneOptions);
    makeAnnouncement("The potential crime scenes are: " + optionText);
}

module.exports = {
    makeSceneOptionAnnouncement,
    makeWeaponOptionAnnouncement,
    makeSuspectOptionAnnouncement,
    makeCrimeAnnouncement,
    makeClueAnnouncement,
    makePenultimateAnnouncement,
    makeFinalRevealAnnouncement,
}

function getOptionText(options) {
    let optionText = "";
    options.forEach((option, index) => {
        optionText = optionText + option;
        if (index === options.length - 2) {
            optionText = optionText + ", and ";
        } else if (index < options.length - 2) {
            optionText = optionText + ", ";
        }
    })
    return optionText;
}

function makeAnnouncement(announcement) {
    tweetManager.makeClueTweet(announcement);
    console.log(announcement);
    console.log(announcement.length + " characters");
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

function buildClueDescription(clueBot, nextClue) {
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

