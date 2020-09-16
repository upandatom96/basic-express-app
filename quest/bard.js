const codeRetriever = require('./code-retriever');

function makeNameAnnouncement(hero) {
    const announcement = `Once Upon a Time, ${hero.name} packed up their things and prepared for adventure.`;
    makeAnnouncement(hero, announcement);
}

function makeBackstoryAnnouncement(hero) {
    const announcement = `|HERO| was destined to become a hero. ${hero.backstory}`;
    makeAnnouncement(hero, announcement);
}

function makeStatsAnnouncement(hero) {
    const announcement = `They have ${hero.strength} Strength, ${hero.wisdom} Wisdom, ${hero.charisma} Charisma, and ${hero.dexterity} Dexterity.`;
    makeAnnouncement(hero, announcement);
}

function makeSpecialAnnouncement(hero) {
    const announcement = `Fortunately, they are ${hero.ability}. They will have to overcome being ${hero.weakness}.`;
    makeAnnouncement(hero, announcement);
}

function makeSetOffAnnouncement(hero) {
    const announcement = `|HERO| finished preparing and set off, looking for any quest they could find.`;
    makeAnnouncement(hero, announcement);
}

function makeNewQuestAnnouncement(hero) {
    const quest = codeRetriever.findQuest(hero.currentQuestCode);
    const announcement = `NEW QUEST: ${quest.name}`;
    makeAnnouncement(hero, announcement);
}

function makeDirectAnnouncement(hero, report) {
    makeAnnouncement(hero, report);
}

function makeRestAnnouncement(hero) {
    const announcement = `REST: After their quest, they level up to LVL ${hero.level}! They take a moment and regain some health up to ${hero.hp}/${hero.hpMax}.`;
    makeAnnouncement(hero, announcement);
}

function makeDeathAnnouncement(hero) {
    const announcement = `DEATH: |HERO|'s hp dropped to zero, and their journey ended.`;
    makeAnnouncement(hero, announcement);
}

function makeObituaryAnnouncement(hero) {
    const announcement = `OBIT`;
    makeAnnouncement(hero, announcement);
}

module.exports = {
    makeNameAnnouncement,
    makeBackstoryAnnouncement,
    makeStatsAnnouncement,
    makeSpecialAnnouncement,
    makeSetOffAnnouncement,
    makeNewQuestAnnouncement,
    makeDirectAnnouncement,
    makeRestAnnouncement,
    makeDeathAnnouncement,
    makeObituaryAnnouncement,
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
