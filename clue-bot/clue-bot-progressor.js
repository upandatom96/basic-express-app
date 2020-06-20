const announcer = require('./announcer');

function progressClue(clueBot) {
    switch (clueBot.status) {
        case 0:
            announcer.makeCrimeAnnouncement(clueBot);
            break;
        case 1:
            announcer.makeSuspectOptionAnnouncement(clueBot);
            break;
        case 2:
            announcer.makeWeaponOptionAnnouncement(clueBot);
            break;
        case 3:
            announcer.makeSceneOptionAnnouncement(clueBot);
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
            const clueIndex = clueBot.status - 4;
            const nextClue = clueBot.clues[clueIndex];
            announcer.makeClueAnnouncement(clueBot, nextClue);
            break;
        case 19:
            announcer.makePenultimateAnnouncement(clueBot);
            break;
        case 20:
            announcer.makeFinalRevealAnnouncement(clueBot);
            break;
        default:
            console.log("INVALID STATUS");
    }
    clueBot.status++;
    return clueBot;
}

module.exports = {
    progressClue
}
