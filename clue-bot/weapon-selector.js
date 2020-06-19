const randomUtil = require('../utilities/random.util');

const WEAPONS = [
    "Weapon One",
    "Weapon Two",
    "Weapon Three",
    "Weapon Four",
    "Weapon Five",
    "Weapon Six",
    "Weapon Seven",
    "Weapon Eight",
];

function selectWeapons(weaponCount) {
    const shuffledWeapons = randomUtil.shuffleArray(WEAPONS);
    return shuffledWeapons.slice(0, weaponCount);
}

module.exports = {
    selectWeapons
}
