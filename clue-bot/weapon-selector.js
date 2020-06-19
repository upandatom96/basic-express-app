const randomUtil = require('../utilities/random.util');

const WEAPONS = [
    "Wrench",
    "Candlestick",
    "Knife",
    "Pipe",
    "Revolver",
    "Rope",
    "Anvil",
    "Poison",
    "Bear Trap",
];

function selectWeapons(weaponCount) {
    const shuffledWeapons = randomUtil.shuffleArray(WEAPONS);
    return shuffledWeapons.slice(0, weaponCount);
}

module.exports = {
    selectWeapons
}
