const randomManager = require("../random/random.manager");
const nameyConnector = require("../api-connector/namey.connector");

function getRandomQuestName() {
    try {
        const adjective = capitalizeFirstLetter(randomManager.getOneAdjective());
        const questWord = capitalizeFirstLetter(randomManager.pickQuestWord());
        return `The ${adjective} ${questWord}`;
    } catch (error) {
        console.error(error);
    }
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
