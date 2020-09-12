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

function makeQuestProgressAnnouncement(hero) {
    const announcement = `QUEST PROGRESS: coming soon...`;
    makeAnnouncement(hero, announcement);
}

function makeDeathAnnouncement(hero) {
    const announcement = `|HERO|'s hp dropped to zero, and their journey ended.`;
    makeAnnouncement(hero, announcement);
}

function makeFinaleAnnouncement(hero) {
    const announcement = `FINALE: Coming soon...`;
    makeAnnouncement(hero, announcement);
}

function makeRestAnnouncement(hero) {
    const announcement = `REST: Coming soon...`;
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
    let fullAnnouncement = `${announcement} (${hero.name} p${page})`;
    fullAnnouncement = interpolate(fullAnnouncement, hero);
    // tweetManager.makeQuestTweet(fullAnnouncement);
    console.log(fullAnnouncement);
    console.log(fullAnnouncement.length + " characters");
    hero.journal.push(fullAnnouncement);
}

function getFirstName(heroName) {
    return heroName.split(' ').slice(0, -1).join(' ');
}
