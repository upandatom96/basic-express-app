const randomManager = require("../random/random.manager");
const nameyConnector = require("../api-connector/namey.connector");

function getRandomQuestName() {
    return new Promise((resolve, reject) => {
        const adjective = capitalizeFirstLetter(randomManager.getOneAdjective());
        const questWord = capitalizeFirstLetter(randomManager.pickQuestWord());
        resolve(`The ${adjective} ${questWord}`);
    });
}

async function getRandomHeroName() {
    try {
        const names = await nameyConnector.findRareNames(1);

        return names[0];
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getRandomQuestName,
    getRandomHeroName
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
