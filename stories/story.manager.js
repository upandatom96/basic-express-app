const randomManager = require("../random/random.manager");
const stringUtil = require('../utilities/string.util');

function getRandomStory() {
    const phrase = randomManager.getPhrase();
    return randomManager.pickStoryPrefix() + stringUtil.toTitleCase(phrase);
}

module.exports = {
    getRandomStory
}
