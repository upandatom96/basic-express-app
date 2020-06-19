const clueCreator = require('./clue-creator');

const tweetManager = require('../tweet/tweet.manager');

function makeFinalRevealAnnouncement(clueBot) {
    makeAnnouncement(`THE END. ${clueBot.victim} was killed by ${clueBot.culprit} in ${clueBot.scene} with ${clueBot.weapon}!`);
}

function makePenultimateAnnouncement(clueBot) {
    makeAnnouncement(`The truth of ${clueBot.title} is about to be revealed! Make your guesses now! Who? Where? How?`);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const clueAnnouncement = clueCreator.createClue(clueBot, nextClue);
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
