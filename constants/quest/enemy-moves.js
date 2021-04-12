const MoveTypes = require('./move-types');

const VAMPIRISM_MOVES = [
    {
        type: MoveTypes.DRAIN,
        name: "SUCK BLOOD",
        drainMin: 7,
        drainMax: 17,
        healFactor: 0.666,
    },
];

module.exports = {
    VAMPIRISM_MOVES,
}
