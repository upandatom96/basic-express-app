function makeFinalRevealAnnouncement(clueBot) {
    makeAnnouncement(`It was ${clueBot.culprit} in the ${clueBot.scene} with the ${clueBot.weapon}!`);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const part = clueBot.drawnClues.length;
    makeAnnouncement(`Clue #${part}/15: ${nextClue}`);
}

function makeCrimeAnnouncement(clueBot) {
    makeAnnouncement(`${clueBot.title} begins... ${clueBot.victim} has been killed! Who did it? Where? How?`);
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

function makeAnnouncement(announcement) {
    console.log(announcement);
    console.log(announcement.length + " characters");
}

module.exports = {
    makeSceneOptionAnnouncement,
    makeWeaponOptionAnnouncement,
    makeSuspectOptionAnnouncement,
    makeCrimeAnnouncement,
    makeClueAnnouncement,
    makeFinalRevealAnnouncement,
}
