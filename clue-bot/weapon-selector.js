const randomUtil = require('../utilities/random.util');

const WEAPONS = [
    "A Wrench",
    "A Candlestick",
    "A Knife",
    "A Pipe",
    "A Revolver",
    "A Rope",
    "An Anvil",
    "Poison",
    "A Bear Trap",
    "A Pocket Knife",
    "A Ninja Star",
    "A Sword",
    "An Axe",
    "Motor Oil",
    "A Mouse Trap",
];

function selectWeapons(weaponCount) {
    const shuffledWeapons = randomUtil.shuffleArray(WEAPONS);
    return shuffledWeapons.slice(0, weaponCount);
}

module.exports = {
    selectWeapons
}
