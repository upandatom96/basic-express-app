const tweetManager = require('../tweet/tweet.manager');
const CONSTANTS = require('../constants/constants.manager');
const randomUtil = require('../utilities/random.util');

function makeIntroAnnouncement(clueBot) {
    const introStart = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.INTRO_START_PIECES);
    const introEnd = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.INTRO_END_PIECES);
    const announcement = `${clueBot.title} | ${introStart} ${introEnd}`;
    makeAnnouncement(clueBot, announcement);
}

function makeStatsAnnouncement(clueBot, solvedCount) {
    const announcement = `After solving ${solvedCount + 1} murder mysteries, someone else has been killed! For statistics and solved mysteries, go to https://adam-on-the-internet.github.io/the-clue-bot-ui/`;
    makeAnnouncement(clueBot, announcement);
}

function makeCrimeAnnouncement(clueBot) {
    const crime = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.CRIME_PIECES);
    const announcement = `Last night, ${clueBot.victim} ${crime} at ${clueBot.manorName}. Who did it? Where? How?`;
    makeAnnouncement(clueBot, announcement);
}

function makeSuspectOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.culpritOptions);
    const suspectPiece = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.SUSPECT_OPTION_PIECES);
    const announcement = `${suspectPiece} ${optionText}.`;
    makeAnnouncement(clueBot, announcement);
}

function makeWeaponOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.weaponOptions);
    const weaponPiece = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.WEAPON_OPTION_PIECES);
    const announcement = `${weaponPiece} ${optionText}.`;
    makeAnnouncement(clueBot, announcement);
}

function makeSceneOptionAnnouncement(clueBot) {
    const optionText = getOptionText(clueBot.sceneOptions);
    const scenePiece = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.SCENE_OPTION_PIECES);
    const announcement = `${scenePiece} ${optionText}.`;
    makeAnnouncement(clueBot, announcement);
}

function makeInvestigationAnnouncement(clueBot) {
    const investigationStart = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.INVESTIGATION_PIECES);
    const announcement = `With your lists of potential suspects, weapons, and crime scenes, ${investigationStart}.`;
    makeAnnouncement(clueBot, announcement);
}

function endDayOne(clueBot) {
    const announcement = `Day One of this mystery has ended. The story continues tomorrow as you begin finding clues.`;
    makeAnnouncement(clueBot, announcement);
}

function endDayTwo(clueBot) {
    const announcement = `Day Two of this mystery has ended. The story continues tomorrow as you uncover more clues!`;
    makeAnnouncement(clueBot, announcement);
}

function endDayThree(clueBot) {
    const announcement = `Day Three of this mystery has ended. The story will conclude with tomorrow's first update!`;
    makeAnnouncement(clueBot, announcement);
}

function makeClueAnnouncement(clueBot, clueNumber) {
    const announcement = `Clue #${clueNumber}: ${clueBot.clues[clueNumber - 1]}`;
    makeAnnouncement(clueBot, announcement);
}

function makePenultimateAnnouncement(clueBot) {
    const penultimatePiece = randomUtil.pickRandom(CONSTANTS.ANNOUNCEMENT_PIECES.PENULTIMATE_PIECES);
    const announcement = `${penultimatePiece} ${clueBot.title}! Who? Where? How? Make your guesses...`;
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
    endDayOne,
    endDayTwo,
    endDayThree,
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
    const fullAnnouncement = `${announcement} (${clueBot.title} ${clueBot.status + 1}/27)`;
    tweetManager.makeClueTweet(fullAnnouncement);
    console.log(fullAnnouncement);
    console.log(fullAnnouncement.length + " characters");
    clueBot.announcements.push(fullAnnouncement);
}
