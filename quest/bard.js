const codeRetriever = require('./code-retriever');

const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

const questWords = require('../constants/quest/quest-words');
const adjectives = require('../constants/words/adjectives');

function makeNameAnnouncement(hero) {
    const NAME_TEMPLATES = [
        `Once Upon a Time, a young {HERO_RACE} named {HERO_FULL} would embark on a journey.`,
        `Our story begins with {HERO_FULL}, the {HERO_RACE}.`,
        `As the sun rose again one day, {HERO_FULL} the {HERO_RACE} would with a new feeling.`,
        `{HERO_FULL} the {HERO_RACE} is set to do great things.`,
        `Have you heard the story of {HERO_FULL} the {HERO_RACE}?.`,
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

function getDestinyMessage(hero) {
    if (hero.alignmentGoodVsEvil === "GOOD") {
        return "They were destined to become a hero.";
    } else if (hero.alignmentGoodVsEvil === "EVIL") {
        return "They were destined to rule the world.";
    } else {
        return "They were destined to achieve greatness.";
    }
}

function makeAlignmentAnnouncement(hero) {
    const alignment = getAlignment(hero);
    const destinyMessage = getDestinyMessage(hero);
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
        `While {HERO_FIRST} is {ADV}, they are also {DIS}.`,
        `Growing up, {HERO_FIRST} was loved for being {ADV}, but hated for being {DIS}.`,
        `{HERO_FIRST} is well known for being {ADV} and {DIS}.`,
        `It works in {HERO_FIRST}'s favor that they are {ADV}. They will have to overcome being {DIS}.`,
    ];
    const announcement = randomUtil.pickRandom(SPECIAL_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeMoveAnnouncement(hero) {
    const moveName = codeRetriever.findSpecialMoves(hero.specialMoves)[0].name;
    const MOVE_TEMPLATES = [
        `{HERO_FIRST} was born knowing how to use the special move ${moveName}.`,
        `{HERO_FIRST} knows the special move ${moveName}.`,
        `{HERO_FIRST} invented the special move ${moveName}.`,
        `{HERO_FIRST} trained for years to learn the special move ${moveName}.`,
        `Enemies are terrified of {HERO_FIRST}'s special move ${moveName}.`,
    ];
    const announcement = randomUtil.pickRandom(MOVE_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeSetOffAnnouncement(hero) {
    const homeType = randomUtil.pickRandom(questWords.HOME_NAMES);
    const SET_OFF_TEMPLATES = [
        `{HERO_FIRST} finished preparing and set off away from the {HERO_LAST} ${homeType}, looking for any quest they could find.`,
        `{HERO_FIRST} set off for greatness, leaving the {HERO_LAST} ${homeType} behind forever.`,
        `{HERO_FIRST} put on their boots and walked through the front door of the {HERO_LAST} ${homeType} one last time.`,
        `{HERO_FIRST} was suddenly kicked out of the {HERO_LAST} ${homeType}. They would have to make it on their own.`,
        `The {HERO_LAST} ${homeType} burned down in mysterious circumstances. {HERO_FIRST} was now without a home.`,
    ];
    const announcement = randomUtil.pickRandom(SET_OFF_TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeFindNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestName);
    const FIND_QUEST_TEMPLATES = [
        `{HERO_FIRST} meets a spirit in a dream who tells them of a quest called ${quest.name}.`,
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
        `{HERO_FIRST} begins their quest to ${travelMessage}.`,
    ];
    const announcement = randomUtil.pickRandom(TEMPLATES);
    makeAnnouncement(hero, announcement);
}

function makeDirectAnnouncement(hero, report) {
    makeAnnouncement(hero, report);
}

function makeRestStartAnnouncement(hero) {
    const TEMPLATES = [
        `{HERO_FIRST} completed their quest and takes some time to rest`,
        `With their quest completed, {HERO_FIRST} takes some time to recharge`,
        `After completing their quest, {HERO_FIRST} meditates for a moment`,
        `{HERO_FIRST} celebrates the completed quest with a moment of solitude`,
        `{HERO_FIRST} catches their breath after a difficult quest`,
    ];
    const introPiece = randomUtil.pickRandom(TEMPLATES);
    const adjective = randomUtil.pickRandom(adjectives.ADJECTIVES);
    const location = randomUtil.pickRandom(questWords.AREA_NAMES);
    makeAnnouncement(hero, `${introPiece} near a ${adjective} ${location}.`);
}

function makeRestLevelPingAnnouncement(hero) {
    const LEVEL_TEMPLATES = [
        `{HERO_FIRST} levels up to LVL ${hero.level}.`,
        `{HERO_FIRST} reaches LVL ${hero.level}.`,
        `{HERO_FIRST} achieves LVL ${hero.level}.`,
        `Ping! {HERO_FIRST} is now LVL ${hero.level}.`,
        `{HERO_FIRST} celebrates reaching LVL ${hero.level}.`,
    ];
    const levelPiece = randomUtil.pickRandom(LEVEL_TEMPLATES);
    const DANGER_TEMPLATES = [
        `The world is a bit more dangerous for them now.`,
        `They will now face fiercer enemies.`,
        `Things will be more difficult now.`,
        `From here on out, things will not be getting easier...`,
        `But their enemies are growing stronger as well.`,
    ];
    const dangerPiece = randomUtil.pickRandom(DANGER_TEMPLATES);
    makeAnnouncement(hero, `${levelPiece} ${dangerPiece}`);
}

function makeRestLevelHealthAnnouncement(hero) {
    const TEMPLATES = [
        `With their new level,`,
        `After levelling up,`,
        `As they grow stronger,`,
        `With their new experience,`,
        `For their accomplishments,`,
    ];
    const intro = randomUtil.pickRandom(TEMPLATES);
    const healthNotes = `{HERO_FIRST} gains 5 HP Max from ${hero.hpMax - 5} to ${hero.hpMax}.`;
    makeAnnouncement(hero, `${intro} ${healthNotes}`);
}

function makeRestHealAnnouncement(hero) {
    const TEMPLATES = [
        `As they rest,`,
        `As they recover,`,
        `As they recharge,`,
        `Through taking time to rest,`,
        `After taking a moment to collect their thoughts,`,
    ];
    const intro = randomUtil.pickRandom(TEMPLATES);
    const healthNotes = `{HERO_FIRST} heals up to ${hero.hp}/${hero.hpMax}.`;
    makeAnnouncement(hero, `${intro} ${healthNotes}`);
}

function makeRestEmergeAnnouncement(hero) {
    const questWord = randomUtil.pickRandom(questWords.QUEST_WORDS);
    const INTRO_TEMPLATES = [
        `Feeling renewed,`,
        `Feeling refreshed,`,
        `Decently recharged,`,
        `Recovered from their last quest,`,
        `Ready for more adventure,`,
    ];
    const introPiece = randomUtil.pickRandom(INTRO_TEMPLATES);
    const END_TEMPLATES = [
        `{HERO_FIRST} sets off to seek another ${questWord}.`,
        `{HERO_FIRST} seeks one more ${questWord}.`,
        `{HERO_FIRST} begins looking for another ${questWord}.`,
        `{HERO_FIRST} decides it is time for a new ${questWord}.`,
        `{HERO_FIRST} asks around for another ${questWord}.`,
    ];
    const endPiece = randomUtil.pickRandom(END_TEMPLATES);
    makeAnnouncement(hero, `${introPiece} ${endPiece}`);
}

function makeDeathAnnouncement(hero) {
    const INTRO_TEMPLATES = [
        `{HERO_FIRST} collapses as their hp drops to zero.`,
        `{HERO_FIRST} takes their last breath as their hp drops to zero.`,
        `{HERO_FIRST} feels their life leave their body as their hp drops to zero.`,
        `{HERO_FIRST} relives their happiest moments as their hp reaches zero.`,
        `{HERO_FIRST} wishes they could have completed one more quest as their hp hits zero.`,
        `{HERO_FIRST} has no regrets as their hp hits zero.`,
    ];
    const introPiece = randomUtil.pickRandom(INTRO_TEMPLATES);
    const END_TEMPLATES = [
        `Their journey ends abruptly, but they will be remembered for ages.`,
        `Their life ends abruptly, but they have changed the world.`,
        `Their adventure ends abruptly, but more adventurers will live with their memory.`,
        `It will be a sad day in the kingdom, but also a celebration of their life.`,
        `All those they have helped mourn for the loss of a great hero.`,
    ];
    const endPiece = randomUtil.pickRandom(END_TEMPLATES);
    makeAnnouncement(hero, `${introPiece} ${endPiece}`);
}

function makeObituaryAnnouncement(hero) {
    const questCount = getQuestCount(hero);
    const mainInfo = `They reached Level ${hero.level} and travelled ${hero.distanceTravelledTotal} miles.`;
    const announcement = `RIP {HERO_FULL}. ${mainInfo} ${questCount}`;
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
