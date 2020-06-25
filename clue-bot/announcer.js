const tweetManager = require('../tweet/tweet.manager');
const CONSTANTS = require('../constants/constants.manager');
const randomUtil = require('../utilities/random.util');

function makeIntroAnnouncement(clueBot) {
    // TODO
    const announcement = `${clueBot.title} | Welcome, detectives! A new mystery is about to unfold.`;
    makeAnnouncement(clueBot, announcement);
}

function makeStatsAnnouncement(clueBot, solvedCount) {
    const announcement = `After solving ${solvedCount + 1} murder mysteries, someone else has been killed! For statistics and solved mysteries, go to https://adam-on-the-internet.github.io/the-clue-bot-ui/`;
    makeAnnouncement(clueBot, announcement);
}

function makeCrimeAnnouncement(clueBot) {
    // TODO
    const announcement = `Last night, during a party with many Esteemed Guests, ${clueBot.victim} was killed! Who did it? Where? How?`;
    makeAnnouncement(clueBot, announcement);
}

function makeSuspectOptionAnnouncement(clueBot) {
    // TODO
    const optionText = getOptionText(clueBot.culpritOptions);
    const announcement = "As you head to the house, you compile a list of suspects. " + optionText + " seem suspicious to you.";
    makeAnnouncement(clueBot, announcement);
}

function makeWeaponOptionAnnouncement(clueBot) {
    // TODO
    const optionText = getOptionText(clueBot.weaponOptions);
    const announcement = "You find some strange items throughout the house. " + optionText + " could have been used to kill.";
    makeAnnouncement(clueBot, announcement);
}

function makeSceneOptionAnnouncement(clueBot) {
    // TODO
    const optionText = getOptionText(clueBot.sceneOptions);
    const announcement = "You investigate where the body was found. You take note of nearby rooms: " + optionText + ".";
    makeAnnouncement(clueBot, announcement);
}

function makeInvestigationAnnouncement(clueBot) {
    // TODO
    const announcement = `You have your lists of potential suspects, weapons, and crime scenes. You need to start finding Clues to eliminate some possibilities.`;
    makeAnnouncement(clueBot, announcement);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const clueNumber = clueBot.status - 6;
    const announcement = `Clue #${clueNumber}: ${nextClue}`;
    makeAnnouncement(clueBot, announcement);
}

function makePenultimateAnnouncement(clueBot) {
    const penultimatePiece = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.PENULTIMATE_PIECES);
    const announcement = `${penultimatePiece} ${clueBot.title}! Make your guesses now! Who? Where? How?`;
    makeAnnouncement(clueBot, announcement);
}

function makeFinalRevealAnnouncement(clueBot) {
    const revealIntro = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.REVEAL_PIECES);
    const announcement = `${revealIntro} ${clueBot.victim} was killed by ${clueBot.culprit} in ${clueBot.scene} with ${clueBot.weapon}!`;
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
