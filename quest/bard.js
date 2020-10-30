const codeRetriever = require('./code-retriever');

const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

function makeNameAnnouncement(hero) {
    const NAME_TEMPLATES = [
        `Once Upon a Time, a young {HERO_RACE} named {HERO_FULL} would embark on a journey.`,
        `Our story begins with {HERO_FULL}, the {HERO_RACE}.`,
        `As the sun rose again one day, {HERO_FULL} the {HERO_RACE} would with a new feeling.`,
    ];
    const announcement = randomUtil.pickRandom(NAME_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeBackstoryAnnouncement(hero) {
    const BACKSTORY_CHOICES = [
        `{HERO_FIRST} packed up their things and prepared for adventure. They had been training for this moment.`,
        `{HERO_FIRST} was reluctant to start a journey, but they had no choice after their father's murder.`,
        `{HERO_FIRST} is the King's secret child. The only people alive that knew were the King and {HERO_FIRST}.`,
        `{HERO_FIRST} is the chosen one. The gods has selected them for greatness from birth.`,
        `{HERO_FIRST} was the most adventurous member of their generation. Everyone expected them to make an incredible journey.`,
    ];
    const announcement = randomUtil.pickRandom(BACKSTORY_CHOICES);
    makeAnnouncement(hero, announcement);
}

function makeAlignmentAnnouncement(hero) {
    const alignment = getAlignment(hero);
    let destinyMessage = "";
    if (hero.alignmentGoodVsEvil === "GOOD") {
        destinyMessage = "They were destined to become a hero.";
    } else if (hero.alignmentGoodVsEvil === "EVIL") {
        destinyMessage = "They were destined to rule the world.";
    } else {
        destinyMessage = "They were destined to achieve greatness.";
    }
    const announcement = `{HERO_FIRST} is ${alignment}. ${destinyMessage}`;
    makeAnnouncement(hero, announcement);
}

function makeLoadoutAnnouncement(hero) {
    const announcement = `{HERO_FIRST} has ${hero.inventory[0]} in their inventory. They are joined by a ${hero.party[0]}.`;
    makeAnnouncement(hero, announcement);
}

function makeStatsAnnouncement(hero) {
    const announcement = `{HERO_FIRST} has ${hero.strength} Strength, ${hero.wisdom} Wisdom, ${hero.charisma} Charisma, and ${hero.dexterity} Dexterity.`;
    makeAnnouncement(hero, announcement);
}

function makeSpecialAnnouncement(hero) {
    const SPECIAL_TEMPLATES = [
        `Fortunately, {HERO_FIRST} is {ADV}. Unfortunately, they are {DIS}.`,
        `{HERO_FIRST} is well known for being {ADV} and {DIS}.`,
        `It works in {HERO_FIRST}'s favor that they are {ADV}. They will have to overcome being {DIS}.`,
    ];
    const announcement = randomUtil.pickRandom(SPECIAL_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeMoveAnnouncement(hero) {
    const moveName = codeRetriever.findSpecialMoves(hero.specialMoves)[0].name;
    const MOVE_TEMPLATES = [
        `{HERO_FIRST} knows the special move ${moveName}.`,
        `{HERO_FIRST} trained for years to learn the special move ${moveName}.`,
        `Enemies are terrified of {HERO_FIRST}'s special move ${moveName}.`,
    ];
    const announcement = randomUtil.pickRandom(MOVE_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeSetOffAnnouncement(hero) {
    const SET_OFF_TEMPLATES = [
        `{HERO_FIRST} finished preparing and set off away from the {HERO_LAST} Estate, looking for any quest they could find.`,
        `{HERO_FIRST} set off for greatness, leaving the {HERO_LAST} Farmstead behind forever.`,
        `{HERO_FIRST} put on their boots and walked through their front door one last time.`,
    ];
    const announcement = randomUtil.pickRandom(SET_OFF_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeFindNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestName);
    const FIND_QUEST_TEMPLATES = [
        `{HERO_FIRST} meets an old man who offers them a quest called ${quest.name}.`,
        `{HERO_FIRST} finds a scroll detailing a quest called ${quest.name}.`,
        `{HERO_FIRST} talks to a young woman who sends them on a quest called ${quest.name}.`,
        `{HERO_FIRST} learns of a bounty for quest called ${quest.name}.`,
        `{HERO_FIRST} is given a quest called ${quest.name} by guards outside of a castle.`,
        `{HERO_FIRST} has a sudden vision of a quest called ${quest.name}.`,
        `{HERO_FIRST} finds a poster with the title '${quest.name}' that requests help with a quest.`,
        `{HERO_FIRST} talks to a child who sends them on a quest called ${quest.name}.`,
        `{HERO_FIRST} remembers a story from childhood involving a quest called ${quest.name}.`,
        `A strange man begs {HERO_FIRST} to take a quest called ${quest.name}.`,
        `A long-forgotten relative sends {HERO_FIRST} on a quest called ${quest.name}.`,
        `{HERO_FIRST} takes the initiative to send themself on a quest called ${quest.name}.`,
    ];
    const announcement = randomUtil.pickRandom(FIND_QUEST_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeStartNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestName);
    const travelMessage = `travel ${quest.distanceRequired} miles to the ${quest.destination} and ${quest.text}`;
    const TEMPLATES = [
        `For the quest, {HERO_FIRST} must ${travelMessage}.`,
        `The quest requires that {HERO_FIRST} ${travelMessage}.`,
        `{HERO_FIRST} must ${travelMessage} to complete the quest.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeDirectAnnouncement(hero, report) {
    makeAnnouncement(hero, report);
}

function makeRestStartAnnouncement(hero) {
    const TEMPLATES = [
        `{HERO_FIRST} completed their quest and takes some time to rest.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeRestLevelPingAnnouncement(hero) {
    const TEMPLATES = [
        `{HERO_FIRST} levels up to LVL ${hero.level}. The world is a bit more dangerous for them now.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeRestLevelHealthAnnouncement(hero) {
    const TEMPLATES = [
        `With their new level, {HERO_FIRST} gains 5 HP Max from ${hero.hpMax - 5} to ${hero.hpMax}.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeRestHealAnnouncement(hero) {
    const TEMPLATES = [
        `As they rest, {HERO_FIRST} regains some health up to ${hero.hp}/${hero.hpMax}.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeRestEmergeAnnouncement(hero) {
    const TEMPLATES = [
        `{HERO_FIRST} sets off to seek another quest.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeDeathAnnouncement(hero) {
    const TEMPLATES = [
        `{HERO_FIRST} collapses as their hp drops to zero. Their journey ends abruptly, but they will be remembered for ages.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeObituaryAnnouncement(hero) {
    const uniqueInfo = getQuestCount(hero);

    const mainInfo = `They reached Level ${hero.level} and travelled ${hero.distanceTravelledTotal} miles.`;

    const announcement = `RIP {HERO_FULL}. ${mainInfo} ${uniqueInfo}`;
    makeAnnouncement(hero, announcement);
}

function makeErrorAnnouncement(hero) {
    const errorDeath = "A portal to hell suddenly opens and {HERO_FIRST} is pulled in.";
    makeAnnouncement(hero, errorDeath);
}

module.exports = {
    makeNameAnnouncement,
    makeBackstoryAnnouncement,
    makeAlignmentAnnouncement,
    makeLoadoutAnnouncement,
    makeStatsAnnouncement,
    makeSpecialAnnouncement,
    makeMoveAnnouncement,
    makeSetOffAnnouncement,
    makeFindNewQuestAnnouncement,
    makeStartNewQuestAnnouncement,
    makeDirectAnnouncement,
    makeRestStartAnnouncement,
    makeRestLevelPingAnnouncement,
    makeRestLevelHealthAnnouncement,
    makeRestHealAnnouncement,
    makeRestEmergeAnnouncement,
    makeDeathAnnouncement,
    makeObituaryAnnouncement,
    makeErrorAnnouncement,
}

function interpolate(fullAnnouncement, hero) {
    const firstName = getFirstName(hero.name);
    const lastName = getLastName(hero.name);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_FULL}`, hero.name);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_FIRST}`, firstName);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_LAST}`, lastName);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{HERO_RACE}`, hero.race.toLowerCase());
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{ADV}`, hero.advantage);
    fullAnnouncement = stringUtil.replaceGlobally(fullAnnouncement, `{DIS}`, hero.disadvantage);
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
    return `({HERO_FULL} ${hero.hp}/${hero.hpMax} hp) #${page}`;
}

function getQuestCount(hero) {
    const questCount = hero.completedQuestLog;
    const questS = questCount === 1 ? "" : "s";

    return `They finished ${questCount} quest${questS}.`;
}

function getAlignment(hero) {
    if (hero.alignmentGoodVsEvil === "NEUTRAL" && hero.alignmentLawVsChaos === "NEUTRAL") {
        return "TRUE NEUTRAL";
    } else {
        return `${hero.alignmentLawVsChaos} ${hero.alignmentGoodVsEvil}`;
    }
}
