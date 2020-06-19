function progressClue(clueBot) {
    if (clueBot.status === 0) {
        clueBot.status = 1;
        makeAnnouncement(`Oh No! ${clueBot.victim} has been killed!`);
    } else if (clueBot.status === 1) {
        clueBot.status = 2;
        makeAnnouncement("The suspects are: ");
    } else if (clueBot.status === 2) {
        clueBot.status = 3;
        makeAnnouncement("The potential murder weapons are:");
    } else if (clueBot.status === 3) {
        clueBot.status = 4;
        makeAnnouncement("The potential crime scenes are:");
    } else if (clueBot.status === 4) {
        if (clueBot.unDrawnClues.length === 0) {
            clueBot.status = 5;
            makeAnnouncement(`It was ${clueBot.culprit} in the ${clueBot.scene} with the ${clueBot.weapon}!`);
        } else {
            const nextClue = clueBot.unDrawnClues.shift();
            clueBot.drawnClues.push(nextClue);
            const part = clueBot.drawnClues.length;
            makeAnnouncement(`Clue #${part}/15: ${nextClue}`);
        }
    }
    return clueBot;
}

module.exports = {
    progressClue
}

function makeAnnouncement(announcement) {
    console.log(announcement);
}
