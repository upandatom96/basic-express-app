function progressClue(clueBot) {
    if (clueBot.status === 0) {
        clueBot.status = 1;
        makeAnnouncement("THE CRIME");
    } else if (clueBot.status === 1) {
        if (clueBot.unDrawnClues.length === 0) {
            clueBot.status = 2;
            makeAnnouncement("THE REVEAL");
        } else {
            const nextClue = clueBot.unDrawnClues.shift();
            clueBot.drawnClues.push(nextClue);
            const part = clueBot.drawnClues.length;
            makeAnnouncement(`THE INVESTIGATION (${part}/15)`);
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
