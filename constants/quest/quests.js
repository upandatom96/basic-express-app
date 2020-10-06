const EventTypes = require('./event-types');

const FLAVOR_QUESTS = [
    {
        code: "EGG",
        name: "Mysterious Egg",
        text: "return the Mysterious Egg",
        destination: "the Giant Nest",
        distanceRequired: 99,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches the Giant Nest and sets the Mysterious Egg down. It hatches into a small dragon.",
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
        finaleEvent: {
            intro: "{HERO_FIRST} approaches the ledge and contemplate taking a leap. They notice a pole next to the chasm.",
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
const ENCOUNTER_QUESTS = [];

const LEGACYQUESTS = [
    {
        code: "Q1",
        name: "Dragon's Bounty",
        text: "slay the Red Dragon",
        distanceRequired: 25,
        finaleEvent: {
            type: EventTypes.PATHS,
            intro: "{HERO_FIRST} finds the Red Dragon in a cavern.",
            paths: [
                {
                    damageMin: 40,
                    damageMax: 60,
                    text: "{HERO_FIRST} fights the dragon. They take some damage but manage to defeat the dragon."
                }
            ],
        },
    },
    {
        code: "Q2",
        name: "Witch's Curse",
        text: "melt the Wicked Witch",
        distanceRequired: 25,
        finaleEvent: {
            type: EventTypes.PATHS,
            intro: "{HERO_FIRST} finds the Wicked Witch in an old hut.",
            paths: [
                {
                    triggers: {
                        advantageReq: ["BLESSED"],
                    },
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} is blessed, and defeats the witch easily."
                },
                {
                    triggers: {
                        disadvantageReq: ["CURSED"],
                    },
                    damageMin: 70,
                    damageMax: 75,
                    text: "{HERO_FIRST} is cursed, and defeats the witch with much difficulty."
                },
                {
                    damageMin: 30,
                    damageMax: 50,
                    text: "{HERO_FIRST} fights the witch and wins after taking some damage."
                },
            ],
        },
    },
];

const QUESTS = FLAVOR_QUESTS.concat(DIRECT_QUESTS, CHOICE_QUESTS, PATH_QUESTS, ENCOUNTER_QUESTS);

module.exports = {
    QUESTS: PATH_QUESTS
}
