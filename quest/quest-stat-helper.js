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

module.exports = {
    getStatsForHeroes,
}
