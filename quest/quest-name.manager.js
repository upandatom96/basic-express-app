const randomManager = require("../random/random.manager");
const nameyConnector = require("../api-connector/namey.connector");

const randomUtil = require('../utilities/random.util');
const stringUtil = require('../utilities/string.util');

function getRandomQuestName() {
    try {
        const adjective = stringUtil.capitalizeFirstLetter(randomManager.getOneAdjective());
        const questWord = stringUtil.capitalizeFirstLetter(randomManager.pickQuestWord());
        return `The ${adjective} ${questWord}`;
    } catch (error) {
        console.error(error);
    }
}

async function getRandomHeroName() {
    try {
        const rareNames = await nameyConnector.findRareNames(3, false);
        const commonNames = await nameyConnector.findCommonNames(1, false);
        return randomUtil.pickRandom(rareNames.concat(commonNames));
    } catch (error) {
        const defaultNames = ["Tom", "Flom", "Glom", "Trish", "Felicia"];
        return randomUtil.pickRandom(defaultNames);
        console.error(error);
    }
}

module.exports = {
    getRandomQuestName,
    getRandomHeroName
}
