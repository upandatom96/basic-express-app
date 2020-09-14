const codeRetriever = require('./code-retriever');

function makeNameAnnouncement(hero) {
    const announcement = `INTRODUCING HERO: ${hero.name}`;
    makeAnnouncement(hero, announcement);
}

function makeBackstoryAnnouncement(hero) {
    const announcement = `BACKSTORY: ${hero.backstory}`;
    makeAnnouncement(hero, announcement);
}

function makeStatsAnnouncement(hero) {
    const announcement = `STATS: Strength ${hero.strength}, Wisdom ${hero.wisdom}, Charisma ${hero.charisma}, Dexterity ${hero.dexterity}`;
    makeAnnouncement(hero, announcement);
}

function makeNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const announcement = `NEW QUEST: ${quest.name}`;
    makeAnnouncement(hero, announcement);
}

function makeQuestProgressAnnouncement(hero, report) {
    makeAnnouncement(hero, report);
}

function makeDeathAnnouncement(hero) {
    const announcement = `DEATH: |HERO|'s hp dropped to zero, and their journey ended.`;
    makeAnnouncement(hero, announcement);
}

function makeFinaleAnnouncement(hero, report) {
    makeAnnouncement(hero, report);
}

function makeRestAnnouncement(hero) {
    const announcement = `REST: After your quest, you level up to LVL ${hero.level}! You take a moment and regain some health up to ${hero.hp}/${hero.hpMax}.`;
    makeAnnouncement(hero, announcement);
}

module.exports = {
    makeNameAnnouncement,
    makeBackstoryAnnouncement,
    makeStatsAnnouncement,
    makeNewQuestAnnouncement,
    makeQuestProgressAnnouncement,
    makeDeathAnnouncement,
    makeFinaleAnnouncement,
    makeRestAnnouncement,
}

function interpolate(fullAnnouncement, hero) {
    fullAnnouncement = fullAnnouncement.replace("|HERO|", getFirstName(hero.name));
    return fullAnnouncement;
}

function makeAnnouncement(hero, announcement) {
    const page = hero.journal.length + 1;
    let fullAnnouncement = `${announcement} (${hero.name} ${hero.hp}/${hero.hpMax}hp #${page})`;
    fullAnnouncement = interpolate(fullAnnouncement, hero);
    // tweetManager.makeQuestTweet(fullAnnouncement);
    console.log(fullAnnouncement);
    console.log(fullAnnouncement.length + " characters");
    hero.journal.push(fullAnnouncement);
}

function getFirstName(heroName) {
    return heroName.split(' ').slice(0, -1).join(' ');
}
