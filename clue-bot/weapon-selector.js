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
    "A Ninja Star",
    "A Sword",
    "An Axe",
    "Motor Oil",
    "A Mouse Trap",
    "A Dumbbell",
    "A Trophy",
    "A Potted Plant",
    "A Prized Pumpkin",
    "An LED TV",
    "A Gavel",
    "A Cane-sword",
    "A Guitar",
    "A Pillow",
    "A Banana Peel",
    "A Deadly Fungus",
    "A Venomous Snake",
    "A Pen",
    "A Crucifix",
];

function selectWeapons(weaponCount) {
    const shuffledWeapons = randomUtil.shuffleArray(WEAPONS);
    return shuffledWeapons.slice(0, weaponCount);
}

module.exports = {
    selectWeapons
}
