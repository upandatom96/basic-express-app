const tweetManager = require('../tweet/tweet.manager');

function makeIntroAnnouncement(clueBot) {
    const announcement = `${clueBot.title} | Welcome, detectives!`;
    makeAnnouncement(clueBot, announcement);
}

function makeStatsAnnouncement(clueBot) {
    const announcement = `Previous stats are...`;
    makeAnnouncement(clueBot, announcement);
}

function makeCrimeAnnouncement(clueBot) {
    const announcement = `Last night, during a party with many Esteemed Guests, ${clueBot.victim} was killed! Who did it? Where? How?`;
    makeAnnouncement(clueBot, announcement);
}

function makeSuspectOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.culpritOptions);
    const announcement = optionText + " are all very suspicious.";
    makeAnnouncement(clueBot, announcement);
}

function makeWeaponOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.weaponOptions);
    const announcement = optionText + " could have been used to kill.";
    makeAnnouncement(clueBot, announcement);
}

function makeSceneOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.sceneOptions);
    const announcement = "Based on where the body was found, the murder may have occurred in " + optionText + ".";
    makeAnnouncement(clueBot, announcement);
}

function makeInvestigationAnnouncement(clueBot) {
    const announcement = `Your investigation starts now...`;
    makeAnnouncement(clueBot, announcement);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const clueNumber = clueBot.status - 6;
    const announcement = `Clue #${clueNumber}: ${nextClue}`;
    makeAnnouncement(clueBot, announcement);
}

function makePenultimateAnnouncement(clueBot) {
    const announcement = `The truth of ${clueBot.title} is about to be revealed! Make your guesses now! Who? Where? How?`;
    makeAnnouncement(clueBot, announcement);
}

function makeFinalRevealAnnouncement(clueBot) {
    const announcement = `We caught the Culprit! ${clueBot.victim} was killed by ${clueBot.culprit} in ${clueBot.scene} with ${clueBot.weapon}! Thank you for your help!`;
    makeAnnouncement(clueBot, announcement);
}

module.exports = {
    makeSceneOptionAnnouncement,
    makeWeaponOptionAnnouncement,
    makeSuspectOptionAnnouncement,
    makeCrimeAnnouncement,
    makeClueAnnouncement,
    makePenultimateAnnouncement,
    makeFinalRevealAnnouncement,
    makeInvestigationAnnouncement,
    makeStatsAnnouncement,
    makeIntroAnnouncement,
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

function makeAnnouncement(clueBot, announcement) {
    const fullAnnouncement = `${announcement} (${clueBot.title} ${clueBot.status + 1}/24)`;
    tweetManager.makeClueTweet(fullAnnouncement);
    console.log(fullAnnouncement);
    console.log(fullAnnouncement.length + " characters");
    clueBot.announcements.push(fullAnnouncement);
}
