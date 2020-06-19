function progressClue(clueBot) {
    if (clueBot.status === 0) {
        clueBot.status = 1;
        makeAnnouncement("THE CRIME");
    } else if (clueBot.status === 1) {
        clueBot.status = 2;
        makeAnnouncement("THE OPTIONS: CULPRITS");
    } else if (clueBot.status === 2) {
        clueBot.status = 3;
        makeAnnouncement("THE OPTIONS: WEAPONS");
    } else if (clueBot.status === 3) {
        clueBot.status = 4;
        makeAnnouncement("THE OPTIONS: PLACES");
    } else if (clueBot.status === 4) {
        if (clueBot.unDrawnClues.length === 0) {
            clueBot.status = 5;
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
