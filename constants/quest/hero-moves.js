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
        name: "HEROIC KICK",
        multiplier: 2,
    },
    {
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "HEROIC SLAP",
        multiplier: 1,
    },
    {
        type: MoveTypes.FAIL,
        name: "HEROIC FLASHBACK",
    },
];

const SPECIAL_MOVES = [
    {
        code: "DIFFICULT_RIDDLE",
        type: MoveTypes.WISDOM_ATTACK,
        name: "DIFFICULT RIDDLE",
        multiplier: 1,
    },
    {
        code: "BACKHANDED_COMPLIMENT",
        type: MoveTypes.CHARISMA_ATTACK,
        name: "BACKHANDED_COMPLIMENT",
        multiplier: 1,
    },
    {
        code: "HEAD_BANG",
        type: MoveTypes.STRENGTH_ATTACK,
        name: "HEAD BANG",
        multiplier: 1,
    },
    {
        code: "NOSE_GRAB",
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "NOSE GRAB",
        multiplier: 1,
    },
    {
        code: "MAGIC_DART",
        type: MoveTypes.WISDOM_ATTACK,
        name: "MAGIC DART",
        multiplier: 2,
    },
    {
        code: "SCORNFUL_GLARE",
        type: MoveTypes.CHARISMA_ATTACK,
        name: "SCORNFUL GLARE",
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
    {
        code: "DELIBERATE_PUNCH",
        type: MoveTypes.WISDOM_ATTACK,
        name: "DELIBERATE PUNCH",
        multiplier: 2,
    },
    {
        code: "WITTY_INSULT",
        type: MoveTypes.CHARISMA_ATTACK,
        name: "WITTY INSULT",
        multiplier: 2,
    },
    {
        code: "SUPLEX",
        type: MoveTypes.STRENGTH_ATTACK,
        name: "SUPLEX",
        multiplier: 2,
    },
    {
        code: "SURPRISE_ATTACK",
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "SURPRISE ATTACK",
        multiplier: 2,
    },
    {
        code: "CLEVER_TRAP",
        type: MoveTypes.WISDOM_ATTACK,
        name: "CLEVER TRAP",
        multiplier: 3,
    },
    {
        code: "POISON_KISS",
        type: MoveTypes.CHARISMA_ATTACK,
        name: "POISON KISS",
        multiplier: 3,
    },
    {
        code: "PILEDRIVER",
        type: MoveTypes.STRENGTH_ATTACK,
        name: "PILEDRIVER",
        multiplier: 3,
    },
    {
        code: "RUNNING_PUNCH",
        type: MoveTypes.DEXTERITY_ATTACK,
        name: "RUNNING PUNCH",
        multiplier: 3,
    },
];

module.exports = {
    STANDARD_MOVES,
    SPECIAL_MOVES,
}
