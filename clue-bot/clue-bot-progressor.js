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
            announcer.endDayOne(clueBot);
            break;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            announcer.makeClueAnnouncement(clueBot, clueBot.status - 7);
            break;
        case 16:
            announcer.endDayTwo(clueBot);
            break;
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            announcer.makeClueAnnouncement(clueBot, clueBot.status - 8);
            break;
        case 24:
            announcer.makePenultimateAnnouncement(clueBot);
            break;
        case 25:
            announcer.endDayThree(clueBot);
            break;
        case 26:
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
