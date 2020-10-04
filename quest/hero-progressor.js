const bard = require('./bard');
const action = require('./action');
const HeroStatus = require('./hero-status');

function progressHero(hero) {
    action.checkHealth(hero);

    switch (hero.status) {
        case HeroStatus.REVEAL_HERO:
            action.revealHero(hero);
            bard.makeNameAnnouncement(hero);
            break;
        case HeroStatus.REVEAL_BACKSTORY:
            action.revealBackstory(hero);
            bard.makeBackstoryAnnouncement(hero);
            break;
        case HeroStatus.REVEAL_STATS:
            action.revealStats(hero);
            bard.makeStatsAnnouncement(hero);
            break;
        case HeroStatus.REVEAL_SPECIAL:
            action.revealSpecial(hero);
            bard.makeSpecialAnnouncement(hero);
            break;
        case HeroStatus.SET_OFF:
            action.setOff(hero);
            bard.makeSetOffAnnouncement(hero);
            break;
        case HeroStatus.QUEST_FIND:
            action.findNewQuest(hero);
            bard.makeFindNewQuestAnnouncement(hero);
            break;
        case HeroStatus.QUEST_NEW:
            action.startNewQuest(hero);
            bard.makeStartNewQuestAnnouncement(hero);
            break;
        case HeroStatus.QUEST_CHAPTER_START:
            const chapterStartReport = action.startChapter(hero);
            bard.makeDirectAnnouncement(hero, chapterStartReport);
            break;
        case HeroStatus.QUEST_CHAPTER_PATH_END:
            const chapterEndReport = action.endChapter(hero);
            bard.makeDirectAnnouncement(hero, chapterEndReport);
            break;
        case HeroStatus.QUEST_TRAVEL:
            const travelReport = action.travel(hero);
            bard.makeDirectAnnouncement(hero, travelReport);
            break;
        case HeroStatus.QUEST_FINALE_START:
            const finaleStartReport = action.startFinale(hero);
            bard.makeDirectAnnouncement(hero, finaleStartReport);
            break;
        case HeroStatus.QUEST_FINALE_END:
            const finaleEndReport = action.endFinale(hero);
            bard.makeDirectAnnouncement(hero, finaleEndReport);
            break;
        case HeroStatus.REST_START:
            action.startRest(hero);
            bard.makeRestStartAnnouncement(hero);
            break;
        case HeroStatus.REST_END:
            action.endRest(hero);
            bard.makeRestEndAnnouncement(hero);
            break;
        case HeroStatus.DYING:
            action.die(hero);
            bard.makeDeathAnnouncement(hero);
            break;
        case HeroStatus.OBITUARY:
            action.obituary(hero);
            bard.makeObituaryAnnouncement(hero);
            break;
        default:
            console.log("INVALID HERO STATUS: " + hero.status);
    }
    return hero;
}

module.exports = {
    progressHero
}
