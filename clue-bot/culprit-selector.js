const randomUtil = require('../utilities/random.util');

const CULPRITS = [
    "Mr. Teal",
    "Doctor Chartreuse",
    "Chef Ratatouille",
    "Professor Chalmers",
    "Elizabeth Bloodwell",
    "Hamilton Alexandre",
    "Ms. Terri",
    "Old MacDonald",
    "De Tektiv",
    "Captain O' Ship",
    "Fido",
    "John Smith",
    "Jane Doe",
    "The Count",
    "Granny",
    "Simon",
];

function selectCulprits(culpritCount) {
    const shuffledCulprits = randomUtil.shuffleArray(CULPRITS);
    return shuffledCulprits.slice(0, culpritCount);
}

module.exports = {
    selectCulprits
}
