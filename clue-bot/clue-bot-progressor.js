const announcer = require('./announcer');

function progressClue(clueBot, solvedCount) {
    switch (clueBot.status) {
        case 0:
            announcer.makeIntroAnnouncement(clueBot);
            break;
        case 1:
            announcer.makeStatsAnnouncement(clueBot, solvedCount);
            break;
        case 2:
            announcer.makeCrimeAnnouncement(clueBot);
            break;
        case 3:
            announcer.makeSuspectOptionAnnouncement(clueBot);
            break;
        case 4:
            announcer.makeSceneOptionAnnouncement(clueBot);
            break;
        case 5:
            announcer.makeWeaponOptionAnnouncement(clueBot);
            break;
        case 6:
            announcer.makeInvestigationAnnouncement(clueBot);
            break;
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
        case 19:
        case 20:
        case 21:
            announcer.makeClueAnnouncement(clueBot, clueBot.status - 6);
            break;
        case 22:
            announcer.makePenultimateAnnouncement(clueBot);
            break;
        case 23:
            clueBot.solved = true;
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
