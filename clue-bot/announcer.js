function makeFinalRevealAnnouncement(clueBot) {
    makeAnnouncement(`It was ${clueBot.culprit} in the ${clueBot.scene} with the ${clueBot.weapon}!`);
}

function makeClueAnnouncement(clueBot, nextClue) {
    const part = clueBot.drawnClues.length;
    makeAnnouncement(`Clue #${part}/15: ${nextClue}`);
}

function makeCrimeAnnouncement(clueBot) {
    makeAnnouncement(`Oh No! ${clueBot.victim} has been killed!`);
}

function makeSuspectOptionAnnouncement() {
    makeAnnouncement("The suspects are: ");
}

function makeWeaponOptionAnnouncement() {
    makeAnnouncement("The potential murder weapons are:");
}

function makeSceneOptionAnnouncement() {
    makeAnnouncement("The potential crime scenes are:");
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
