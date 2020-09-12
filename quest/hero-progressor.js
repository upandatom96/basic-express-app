const bard = require('./bard');

function progressHero(hero) {
    switch (hero.status) {
        case 0:
            bard.makeNameAnnouncement(hero);
            hero.status++;
            break;
        case 1:
            bard.makeBackstoryAnnouncement(hero);
            hero.status++;
            break;
        case 2:
            bard.makeStatsAnnouncement(hero);
            hero.status++;
            break;
        case 3:
            // TODO quest master here...
            bard.makeQuestProgressAnnouncement(hero);
            hero.status++;
            break;
        default:
            console.log("INVALID HERO");
    }
    return hero;
}

module.exports = {
    progressHero
}
