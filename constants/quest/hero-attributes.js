const ADV = require('./hero-advantages');
const DIS = require('./hero-disadvantages');

const BACKSTORY = [
    "They are the king's secret child.",
    "They are the chosen one.",
];

module.exports = {
    ADVANTAGES: [ADV.ATTRACTIVE, ADV.BLESSED],
    DISADVANTAGES: [DIS.SMELLY, DIS.CURSED],
    BACKSTORY
}
