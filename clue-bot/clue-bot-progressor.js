const announcer = require('./announcer');

function progressClue(clueBot) {
    if (clueBot.status === 0) {
        clueBot.status = 1;
        announcer.makeCrimeAnnouncement(clueBot);
    } else if (clueBot.status === 1) {
        clueBot.status = 2;
        announcer.makeSuspectOptionAnnouncement(clueBot);
    } else if (clueBot.status === 2) {
        clueBot.status = 3;
        announcer.makeWeaponOptionAnnouncement(clueBot);
    } else if (clueBot.status === 3) {
        clueBot.status = 4;
        announcer.makeSceneOptionAnnouncement(clueBot);
    } else if (clueBot.status === 4) {
        if (clueBot.clues.length === 0) {
            clueBot.status = 5;
            announcer.makeFinalRevealAnnouncement(clueBot);
        } else {
            const nextClue = clueBot.clues.shift();
            announcer.makeClueAnnouncement(clueBot, nextClue);
        }
    }
    return clueBot;
}

module.exports = {
    progressClue
}
