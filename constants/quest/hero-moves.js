const MoveTypes = require('./move-types');

const STANDARD_MOVES = [
    {
        type: MoveTypes.HEAL,
        name: "HEROIC HEAL",
        multiplier: 1,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HEROIC PUNCH",
        multiplier: 1,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HEROIC JAB",
        multiplier: 1,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HEROIC KICK",
        multiplier: 2,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "HEROIC SLAP",
        multiplier: 1,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "HEROIC SWIPE",
        multiplier: 1,
    },
    {
        type: MoveTypes.WISDOM_ATTACK,
        name: "HEROIC MAGIC BLAST",
        multiplier: 1,
    },
    {
        type: MoveTypes.CHARISMA_ATTACK,
        name: "HEROIC BAIT AND SWITCH",
        multiplier: 1,
    },
    {
        type: MoveTypes.FAIL,
        name: "HEROIC FLASHBACK",
    },
];

const SPECIAL_MOVES = [
    {
        type: MoveTypes.FAIL,
        name: "COUGH",
    },
    {
        type: MoveTypes.HEAL,
        name: "RECOVER",
        multiplier: 1,
    },
    {
        type: MoveTypes.WISDOM_ATTACK,
        name: "DIFFICULT RIDDLE",
        multiplier: 1,
    },
    {
        type: MoveTypes.CHARISMA_ATTACK,
        name: "BACKHANDED_COMPLIMENT",
        multiplier: 1,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HEAD BANG",
        multiplier: 1,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "NOSE GRAB",
        multiplier: 1,
    },
    {
        type: MoveTypes.WISDOM_ATTACK,
        name: "MAGIC DART",
        multiplier: 2,
    },
    {
        type: MoveTypes.CHARISMA_ATTACK,
        name: "SCORNFUL GLARE",
        multiplier: 2,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "ELBOW JAB",
        multiplier: 2,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "ROUNDHOUSE KICK",
        multiplier: 2,
    },
    {
        type: MoveTypes.WISDOM_ATTACK,
        name: "DELIBERATE PUNCH",
        multiplier: 2,
    },
    {
        type: MoveTypes.CHARISMA_ATTACK,
        name: "WITTY INSULT",
        multiplier: 2,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "SUPLEX",
        multiplier: 2,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "SURPRISE ATTACK",
        multiplier: 2,
    },
    {
        type: MoveTypes.WISDOM_ATTACK,
        name: "CLEVER TRAP",
        multiplier: 3,
    },
    {
        type: MoveTypes.CHARISMA_ATTACK,
        name: "POISON KISS",
        multiplier: 3,
    },
    {
        type: MoveTypes.STRENGTH_ATTACK,
        name: "PILEDRIVER",
        multiplier: 3,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "RUNNING PUNCH",
        multiplier: 3,
    },
];

module.exports = {
    STANDARD_MOVES,
    SPECIAL_MOVES,
}
