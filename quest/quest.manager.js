function getRandomQuestName() {
    return new Promise((resolve, reject) => {
        resolve("quest name...");
    });
}

function getRandomHeroName() {
    return new Promise((resolve, reject) => {
        resolve("hero name...");
    });
}

module.exports = {
    getRandomQuestName,
    getRandomHeroName
}
