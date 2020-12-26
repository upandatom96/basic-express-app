function getStatsForHeroes(heroReports) {
    const questsCompleted = heroReports
        .map((hero) => {
            return hero.completedQuests.length;
        })
        .reduce((a, b) => a + b, 0);
    const chaptersCompleted = heroReports
        .map((hero) => {
            return hero.completedChapters.length;
        })
        .reduce((a, b) => a + b, 0);
    const heroesCreated = heroReports.length;
    const message = `${heroesCreated} heroes have completed ${chaptersCompleted} chapters and ${questsCompleted} quests.`;
    return {
        heroesCreated,
        questsCompleted,
        chaptersCompleted,
        message,
    };
}

function getWorldState(goodPts, evilPts, lawPts, chaosPts) {
    let goodVsEvil;
    if (goodPts > evilPts) {
        goodVsEvil = "Good";
    } else if (goodPts < evilPts) {
        goodVsEvil = "Evil";
    } else {
        goodVsEvil = "Neutral";
    }

    let lawVsChaos;
    if (lawPts > chaosPts) {
        lawVsChaos = "Lawful";
    } else if (lawPts < chaosPts) {
        lawVsChaos = "Chaotic";
    } else {
        lawVsChaos = "Neutral";
    }

    let worldState;
    if (goodVsEvil === "Neutral" && lawVsChaos === "Neutral") {
        worldState = "Neutral";
    } else {
        worldState = `${lawVsChaos} ${goodVsEvil}`;
    }
    return worldState;
}

function getWorldStatus(heroes) {
    let hours = 0;
    let goodPts = 0;
    let evilPts = 0;
    let lawPts = 0;
    let chaosPts = 0;
    let allPts = 0;
    heroes.forEach((hero) => {
        // count hours through journal
        hours += hero.journal.length;

        // count good vs evil
        if (hero.alignmentGoodVsEvil === "EVIL") {
            evilPts += hero.level;
        } else if (hero.alignmentGoodVsEvil === "GOOD") {
            goodPts += hero.level;
        }

        // count law vs chaos
        if (hero.alignmentGoodVsEvil === "CHAOTIC") {
            chaosPts += hero.level;
        } else if (hero.alignmentGoodVsEvil === "LAWFUL") {
            lawPts += hero.level;
        }

        // count all
        allPts += hero.level;
    });

    const day = Math.floor(hours / 24) + 1;
    const hoursToday = hours % 24;
    const worldState = getWorldState(goodPts, evilPts, lawPts, chaosPts);
    const message = `It is day ${day} hour ${hoursToday}. The world is ${worldState}.`;

    return {
        hours: hours,
        day,
        hoursToday,
        good: goodPts,
        evil: evilPts,
        law: lawPts,
        chaos: chaosPts,
        progress: allPts,
        worldState,
        message,
    };
}

module.exports = {
    getStatsForHeroes,
    getWorldStatus,
}
