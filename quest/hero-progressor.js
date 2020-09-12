const bard = require('./bard');
const action = require('./action');

function progressHero(hero) {
    action.checkHealth(hero);

    switch (hero.status) {
        case 0:
            action.revealHero(hero);
            bard.makeNameAnnouncement(hero);
            break;
        case 1:
            action.revealBackstory(hero);
            bard.makeBackstoryAnnouncement(hero);
            break;
        case 2:
            action.revealStats(hero);
            bard.makeStatsAnnouncement(hero);
            break;
        case 10:
            action.gainNewQuest(hero);
            bard.makeNewQuestAnnouncement(hero);
            break;
        case 11:
            const travelReport = action.travel(hero);
            bard.makeQuestProgressAnnouncement(hero, travelReport);
            break;
        case 12:
            const finaleReport = action.finale(hero);
            bard.makeFinaleAnnouncement(hero, finaleReport);
            break;
        case 13:
            action.rest(hero);
            bard.makeRestAnnouncement(hero);
            break;
        case 98:
            action.death(hero);
            bard.makeDeathAnnouncement(hero);
            break;
        default:
            console.log("INVALID HERO");
    }
    return hero;
}

module.exports = {
    progressHero
}
