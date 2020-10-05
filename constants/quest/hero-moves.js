const MoveTypes = require('./move-types');

const STANDARD_MOVES = [
    {
        type: MoveTypes.HEAL,
        name: "HERO HEAL",
        multiplier: 1,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HERO PUNCH",
        multiplier: 1,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HERO KICK",
        multiplier: 2,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "HERO SLAP",
        multiplier: 1,
    },
    {
        type: MoveTypes.FAIL,
        name: "HERO TRIP",
    },
];

const SPECIAL_MOVES = [
    {
        code: "CLEVER_TRAP",
        type: MoveTypes.WISDOM_ATTACK,
        name: "CLEVER TRAP",
        multiplier: 2,
    },
    {
        code: "POISON_KISS",
        type: MoveTypes.CHARISMA_ATTACK,
        name: "POISON KISS",
        multiplier: 2,
    },
    {
        code: "ELBOW_JAB",
        type: MoveTypes.STRENGTH_ATTACK,
        name: "ELBOW JAB",
        multiplier: 2,
    },
    {
        code: "ROUNDHOUSE_KICK",
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "ROUNDHOUSE KICK",
        multiplier: 2,
    },
];

module.exports = {
    STANDARD_MOVES,
    SPECIAL_MOVES,
}
