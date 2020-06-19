const clueCreator = require('./clue-creator');

const tweetManager = require('../tweet/tweet.manager');

function makeCrimeAnnouncement(clueBot) {
    const announcement = `${clueBot.title} | Welcome, detectives! Last night, during a party with many Esteemed Guests, ${clueBot.victim} was killed! Who did it? Where? How?`;
    makeAnnouncement(clueBot, 1, announcement);
}

function makeSuspectOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.culpritOptions);
    const announcement = optionText + " are all very suspicious.";
    makeAnnouncement(clueBot, 2, announcement);
}

function makeWeaponOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.weaponOptions);
    const announcement = optionText + " could have been used to kill.";
    makeAnnouncement(clueBot, 3, announcement);
}

function makeSceneOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.sceneOptions);
    const announcement = "The body was found near " + optionText + ".";
    makeAnnouncement(clueBot, 4, announcement);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const clueAnnouncement = clueCreator.createClue(clueBot, nextClue);
    const part = 15 - clueBot.clues.length;
    const announcement = `Clue #${part}: ${clueAnnouncement}`;
    makeAnnouncement(clueBot, 4 + part, announcement);
}

function makePenultimateAnnouncement(clueBot) {
    const announcement = `The truth of ${clueBot.title} is about to be revealed! Make your guesses now! Who? Where? How?`;
    makeAnnouncement(clueBot, 20, announcement);
}

function makeFinalRevealAnnouncement(clueBot) {
    const announcement = `We caught the Culprit! ${clueBot.victim} was killed by ${clueBot.culprit} in ${clueBot.scene} with ${clueBot.weapon}! Thank you for your help!`;
    makeAnnouncement(clueBot, 21, announcement);
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

function makeAnnouncement(clueBot, part, announcement) {
    const fullAnnouncement = `${announcement} (${clueBot.title} ${part}/21)`;
    tweetManager.makeClueTweet(fullAnnouncement);
    console.log(fullAnnouncement);
    console.log(fullAnnouncement.length + " characters");
}
