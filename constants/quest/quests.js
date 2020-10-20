const EventTypes = require('./event-types');
const MoveTypes = require('./move-types');

const FLAVOR_QUESTS = [
    {
        code: "EGG",
        name: "Mysterious Egg",
        text: "return the Mysterious Egg",
        destination: "the Giant Nest",
        distanceRequired: 99,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches the Giant Nest and sets the Mysterious Egg down. It hatches into a small dragon.",
            type: EventTypes.FLAVOR,
        },
    },
    {
        code: "LOVE_LETTER",
        name: "Love Letter",
        text: "deliver the Love Letter to the Princess",
        destination: "the Tall Tower",
        distanceRequired: 101,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches the Tall Tower and gives the Love Letter to a guard. You are assured the guard will pass it to the Princess.",
            type: EventTypes.FLAVOR,
        },
    },
];
const DIRECT_QUESTS = [
    {
        code: "BLOOD",
        name: "Blood Sacrifice",
        text: "make a Blood Sacrifice",
        destination: "THE FORBIDDEN ALTAR",
        distanceRequired: 66,
        expPoints: 30,
        finaleEvent: {
            intro: "THE FORBIDDEN ALTAR is glowing softly as {HERO_FIRST} approaches. Something feels wrong.",
            damageMin: 1,
            damageMax: 100,
            text: "On THE FORBIDDEN ALTAR is a FORBIDDEN STONE. {HERO_FIRST} uses it to prick their finger. The altar's glow subsides.",
            type: EventTypes.DIRECT,
        },
    },
];
const CHOICE_QUESTS = [
    {
        code: "LEAP",
        name: "Leap of Faith",
        text: "take a Leap of Faith",
        destination: "the Wide Chasm",
        distanceRequired: 50,
        expPoints: 40,
        finaleEvent: {
            intro: "{HERO_FIRST} approaches the ledge and contemplates taking a leap. They notice a pole next to the chasm.",
            type: EventTypes.CHOICE,
            choices: [
                {
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} uses the pole to vault across the chasm. They make it, but land hard on the other end."
                },
                {
                    text: "{HERO_FIRST} decides to truly use faith and make the leap without the pole. They make it gracefully."
                },
            ],
        },
    },
];
const PATH_QUESTS = [
    {
        code: "MAZE",
        name: "Through the Maze",
        text: "navigate through to the end",
        destination: "the Maze",
        distanceRequired: 50,
        expPoints: 60,
        finaleEvent: {
            intro: "{HERO_FIRST} begins walking through the Maze, unsure where they are headed.",
            type: EventTypes.PATHS,
            paths: [
                {
                    triggers: {
                        wisdomReq: 7,
                    },
                    text: "{HERO_FIRST} is wise enough to always follow the left wall, they make it through easily."
                },
                {
                    triggers: {
                        wisdomReq: 4,
                    },
                    damageMin: 6,
                    damageMax: 9,
                    text: "{HERO_FIRST} makes marks on the wall as they go, and only falls in a couple traps."
                },
                {
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} does not know how to navigate the maze and falls into many traps."
                }
            ],
        },
    },
];
const ENCOUNTER_QUESTS = [
    {
        code: "DRAGON",
        name: "Dragon's Bounty",
        text: "slay the Red Dragon",
        destination: "the Dragon's Lair",
        distanceRequired: 25,
        expPoints: 70,
        finaleEvent: {
            intro: "The Red Dragon notices {HERO_FIRST} and prepares to fight.",
            enemyName: "Red Dragon",
            defeat: "{HERO_FIRST} has slayed the dragon!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 50,
            enemyHpMax: 50,
            dexterity: 5,
            charisma: 5,
            wisdom: 6,
            strength: 7,
            moves: [
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "CLAW SWIPE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "LAIR TRAP",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "FIRE BREATH",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "GUARD TREASURE",
                },
            ],
        },
    },
    {
        code: "WITCH",
        name: "Witch's Curse",
        text: "melt the Wicked Witch",
        destination: "the Witch's Hut",
        distanceRequired: 30,
        expPoints: 70,
        finaleEvent: {
            intro: "The Witch notices {HERO_FIRST} and prepares to fight.",
            enemyName: "Wicked Witch",
            defeat: "{HERO_FIRST} has melted the witch!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 40,
            enemyHpMax: 40,
            dexterity: 3,
            charisma: 3,
            wisdom: 8,
            strength: 3,
            moves: [
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "WIND SPELL",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "ICE SPELL",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "FIRE SPELL",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "PRACTICE SPELL",
                },
            ],
        },
    },
];

const QUESTS = FLAVOR_QUESTS.concat(DIRECT_QUESTS, CHOICE_QUESTS, PATH_QUESTS, ENCOUNTER_QUESTS);

module.exports = {
    QUESTS
}
