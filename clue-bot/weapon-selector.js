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
    "Pocket Knife",
    "Ninja Star",
    "Sword",
    "Axe",
    "Motor Oil",
    "Mouse Trap",
];

function selectWeapons(weaponCount) {
    const shuffledWeapons = randomUtil.shuffleArray(WEAPONS);
    return shuffledWeapons.slice(0, weaponCount);
}

module.exports = {
    selectWeapons
}
