const EventTypes = require('./event-types');

const FLAVOR_QUESTS = [
    {
        code: "EGG",
        type: "STANDARD",
        name: "Mysterious Egg",
        text: "return the Mysterious Egg to its nest",
        distanceRequired: 99,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches a giant nest and sets the Mysterious Egg down. It hatches into a small dragon.",
            type: EventTypes.FLAVOR,
        },
    },
];
const DIRECT_QUESTS = [];
const CHOICE_QUESTS = [];
const PATH_QUESTS = [
    {
        code: "Q1",
        type: "STANDARD",
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
        type: "STANDARD",
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
const ENCOUNTER_QUESTS = [];

const QUESTS = PATH_QUESTS.concat(FLAVOR_QUESTS, DIRECT_QUESTS, CHOICE_QUESTS, PATH_QUESTS, ENCOUNTER_QUESTS);

module.exports = {
    QUESTS: FLAVOR_QUESTS
}
