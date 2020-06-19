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
    "Mr. 1",
    "Ms. 2",
    "Mrs. 3",
    "Mx. 4",
    "Dr. 5",
    "Mx. 6",
    "Simon",
];

function selectCulprits(culpritCount) {
    const shuffledCulprits = randomUtil.shuffleArray(CULPRITS);
    return shuffledCulprits.slice(0, culpritCount);
}

module.exports = {
    selectCulprits
}
