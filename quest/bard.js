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

function makeQuestProgressAnnouncement(hero) {
    const announcement = `QUEST PROGRESS: coming soon...`;
    makeAnnouncement(hero, announcement);
}

module.exports = {
    makeNameAnnouncement,
    makeBackstoryAnnouncement,
    makeStatsAnnouncement,
    makeQuestProgressAnnouncement,
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
