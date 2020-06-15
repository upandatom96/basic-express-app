const randomManager = require("../random/random.manager");
const stringUtil = require('../utilities/string.util');

function getRandomStory() {
    const noun1 = stringUtil.toTitleCase(randomManager.pickNoun());
    const noun2 = stringUtil.toTitleCase(randomManager.pickNoun());
    const adjective1 = stringUtil.toTitleCase(randomManager.pickAdjective());
    const adjective2 = stringUtil.toTitleCase(randomManager.pickAdjective());
    let storyPrefix = randomManager.pickStoryPrefix();
    storyPrefix = storyPrefix.replace("{N1}", noun1);
    storyPrefix = storyPrefix.replace("{A1}", adjective1);
    storyPrefix = storyPrefix.replace("{N2}", noun2);
    storyPrefix = storyPrefix.replace("{A2}", adjective2);
    return storyPrefix;
}

module.exports = {
    getRandomStory
}
