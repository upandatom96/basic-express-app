const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');

function getUnusedCaseName(allCases) {
    const oldNames = [];
    allCases.forEach((thisCase) => {
        oldNames.push(thisCase.name);
    });
    const caseName = randomManager.getNewPhrase(oldNames);
    return stringUtil.toTitleCase(caseName);
}

module.exports = {
    getUnusedCaseName
};
