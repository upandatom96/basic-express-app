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
        "Smelliest",
        "Toughest",
    ]);
}

function getNoun() {
    return randomUtil.pickRandom([
        "Dog",
        "Log",
        "Hat",
        "Cat",
        "House",
        "Mouse",
    ]);
}

module.exports = {
    getOne,
}
