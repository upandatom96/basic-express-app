const codeRetriever = require('./code-retriever');

const stringUtil = require('../utilities/string.util');
const calcUtil = require('../utilities/calc.util');

function makeNameAnnouncement(hero) {
    const announcement = `Once Upon a Time, ${hero.name} packed up their things and prepared for adventure.`;
    makeAnnouncement(hero, announcement);
}

function makeBackstoryAnnouncement(hero) {
    const announcement = `{HERO_FIRST} was destined to become a hero. ${hero.backstory}`;
    makeAnnouncement(hero, announcement);
}

function makeStatsAnnouncement(hero) {
    const announcement = `{HERO_FIRST} has ${hero.strength} Strength, ${hero.wisdom} Wisdom, ${hero.charisma} Charisma, and ${hero.dexterity} Dexterity.`;
    makeAnnouncement(hero, announcement);
}

function makeSpecialAnnouncement(hero) {
    const announcement = `Fortunately, {HERO_FIRST} is ${hero.advantage}. They will have to overcome being ${hero.disadvantage}.`;
    makeAnnouncement(hero, announcement);
}

function makeMoveAnnouncement(hero) {
    const moveName = codeRetriever.findSpecialMoves(hero.specialMoveCodes)[0].name;
    const announcement = `{HERO_FIRST} knows the special move ${moveName}.`;
    makeAnnouncement(hero, announcement);
}

function makeSetOffAnnouncement(hero) {
    const announcement = `{HERO_FIRST} finished preparing and set off away from the {HERO_LAST} Estate, looking for any quest they could find.`;
    makeAnnouncement(hero, announcement);
}

function makeFindNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const announcement = `{HERO_FIRST} meets an old man who offers them a quest called ${quest.name}.`;
    makeAnnouncement(hero, announcement);
}

function makeStartNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const travelMessage = `travel ${quest.distanceRequired} miles to the ${quest.destination}`;
    const announcement = `For the quest, {HERO_FIRST} must ${travelMessage} and ${quest.text}.`;
    makeAnnouncement(hero, announcement);
}

function makeDirectAnnouncement(hero, report) {
    makeAnnouncement(hero, report);
}

function makeRestStartAnnouncement(hero) {
    // completed quest, level up! more difficult
    const announcement = `{HERO_FIRST} completed their quest and takes some time to rest. They level up to LVL ${hero.level}. The world is a bit more dangerous for them now.`;
    makeAnnouncement(hero, announcement);
}

function makeRestEndAnnouncement(hero) {
    // rest, gain hp MAX regain health
    const announcement = `With their new level, {HERO_FIRST} gains 5 HP Max from ${hero.hpMax - 5} to ${hero.hpMax} and they regain some health up to ${hero.hp}/${hero.hpMax}.`;
    makeAnnouncement(hero, announcement);
}

function makeDeathAnnouncement(hero) {
    const announcement = `{HERO_FIRST} collapses as their hp drops to zero. Their journey ends abruptly, but they will be remembered for ages.`;
    makeAnnouncement(hero, announcement);
}

function makeObituaryAnnouncement(hero) {
    const uniqueInfo = getUniqueInfo(hero);

    const mainInfo = `They reached Level ${hero.level} and travelled ${hero.distanceTravelledTotal} miles.`;

    const announcement = `RIP {HERO_FULL}. ${mainInfo} ${uniqueInfo}`;
    makeAnnouncement(hero, announcement);
}

module.exports = {
    makeNameAnnouncement,
    makeBackstoryAnnouncement,
    makeStatsAnnouncement,
    makeSpecialAnnouncement,
    makeMoveAnnouncement,
    makeSetOffAnnouncement,
    makeFindNewQuestAnnouncement,
    makeStartNewQuestAnnouncement,
    makeDirectAnnouncement,
    makeRestStartAnnouncement,
    makeRestEndAnnouncement,
    makeDeathAnnouncement,
    makeObituaryAnnouncement,
}

function interpolate(fullAnnouncement, hero) {
    const firstName = getFirstName(hero.name);
    const lastName = getLastName(hero.name);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_FULL}`, hero.name);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_FIRST}`, firstName);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_LAST}`, lastName);
    return fullAnnouncement;
}

function makeAnnouncement(hero, announcement) {
    const closing = getAnnouncementClosing(hero);
    let fullAnnouncement = `${announcement} ${closing}`;
    fullAnnouncement = interpolate(fullAnnouncement, hero);
    // tweetManager.makeQuestTweet(fullAnnouncement);
    console.log(fullAnnouncement);
    console.log(fullAnnouncement.length + " characters");
    hero.journal.push(fullAnnouncement);
}

function getFirstName(heroName) {
    return heroName.split(' ').slice(0, -1).join(' ');
}

function getLastName(heroName) {
    return heroName.split(' ').slice(-1).join(' ');
}

function getAnnouncementClosing(hero) {
    const page = hero.journal.length + 1;
    return `({HERO_FULL} ${hero.hp}/${hero.hpMax} hp #${page})`;
}

function getUniqueInfo(hero) {
    const uniqueQuestCount = calcUtil.countUniqueItems(hero.completedQuestCodeLog);
    const questS = uniqueQuestCount === 1 ? "" : "s";

    const uniqueChapterCount = calcUtil.countUniqueItems(hero.completedChapterCodeLog);
    const chapterS = uniqueChapterCount === 1 ? "" : "s";

    return `They finished ${uniqueQuestCount} unique quest${questS} and had ${uniqueChapterCount} unique encounter${chapterS} along the way.`;
}
