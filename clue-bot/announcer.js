function makeFinalRevealAnnouncement(clueBot) {
    makeAnnouncement(`THE END. ${clueBot.victim} was killed by ${clueBot.culprit} in ${clueBot.scene} with ${clueBot.weapon}!`);
}

function buildClueDescription(clueBot, nextClue) {
    return `${nextClue} is not involved with the murder`;
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
    console.log(announcement);
    console.log(announcement.length + " characters");
}

