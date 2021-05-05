const randomUtil = require("../utilities/random.util");

async function getOne() {
    try {
        const adjective = getAdjective();
        const noun = getNoun();
        const phrase = `${adjective} ${noun}`;
        return {
            phrase
        };
    } catch (error) {
        console.error(error);
    }
}

function getAdjective() {
    return randomUtil.pickRandom([
        "Worst",
        "Best",
        "Coolest",
        "Prettiest",
        "Friendliest",
        "Smelliest",
        "Toughest",
        "Saddest",
        "Happiest",
        "Shiniest",
        "Most Glamorous",
        "Most Gothic",
        "Most Futuristic",
        "Most Likable",
        "Most Colorful",
        "Most Elegant",
        "Cutest",
        "Oldest",
        "Most Futuristic",
        "Strongest",
        "Most Intricate",
        "Funniest",
        "Scariest",
        "Darkest",
        "Brightest",
        "Most Green",
        "Fanciest",
    ]);
}

function getNoun() {
    return randomUtil.pickRandom([
        "Painting",
        "Statue",
        "Person",
        "Guitar",
        "Dress",
        "Wallpaper",
        "Plant",
        "Bird",
        "Dog",
        "Log",
        "Hat",
        "Cat",
        "House",
        "Mouse",
        "T-Shirt",
        "Castle",
        "Aunt",
        "Uncle",
        "Doctor",
        "Stairway",
        "Hallway",
        "Couch",
        "Plant",
        "Bird",
        "Athlete",
        "Puzzle",
        "Bridge",
        "Pants",
        "Vampire",
        "Ghost",
        "Monster",
        "Pet",
        "Jacket",
    ]);
}

module.exports = {
    getOne,
}
