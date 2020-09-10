const randomManager = require("../random/random.manager");

function getRandomQuestName() {
    return new Promise((resolve, reject) => {
        const adjective = capitalizeFirstLetter(randomManager.getOneAdjective());
        const questWord = capitalizeFirstLetter(randomManager.pickQuestWord());
        resolve(`The ${adjective} ${questWord}`);
    });
}

function getRandomHeroName() {
    return new Promise((resolve, reject) => {
        const name = "Gribnar";
        resolve(`${name}`);
    });
}

module.exports = {
    getRandomQuestName,
    getRandomHeroName
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
