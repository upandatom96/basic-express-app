const randomUtil = require('../utilities/random.util');

const CULPRITS = [
    "Character One",
    "Character Two",
    "Character Three",
    "Character Four",
    "Character Five",
    "Character Six",
    "Character Seven",
    "Character Eight",
    "Character Nine",
];

function selectCulprits(culpritCount) {
    const shuffledCulprits = randomUtil.shuffleArray(CULPRITS);
    return shuffledCulprits.slice(0, culpritCount);
}

module.exports = {
    selectCulprits
}
