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
    "Sergeant Ketchup",
    "Granny",
    "Miss Scarlet",
    "Yvette",
    "Mrs. Peacock",
    "Colonel Mustard",
    "Professor Plum",
    "Mr. Green",
    "Mr. Boddy",
    "Mrs. White",
    "The Singing Telegram Girl",
    "Wadsworth",
    "The Cook",
    "Sherlock Holmes",
    "Miss Peach",
    "Monsieur Brunette",
    "Madame Rose",
    "Sergeant Gray",
    "Dr. Orchid",
    "The Thief",
    "Mr. Slate-Grey",
    "Captain Brown",
    "Lady Lavender",
    "Mr. Meadow-Brook",
    "Mrs. Meadow-Brook",
    "Prince Azure",
    "Rusty Nayler",
    "Lord Gray",
    "Hogarth",
    "The Black Dog",
    "Editor Braunman",
    "The Reporter",
    "Inspector Brown",
    "The Butler",
    "A Mysterious Stranger",
    "The Judge",
    "The Reverend",
];

function selectCulprits(culpritCount) {
    const shuffledCulprits = randomUtil.shuffleArray(CULPRITS);
    return shuffledCulprits.slice(0, culpritCount);
}

module.exports = {
    selectCulprits
}
