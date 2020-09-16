const QUESTS = [
    {
        code: "Q1",
        type: "STANDARD",
        name: "Dragon's Bounty",
        text: "slay the Red Dragon",
        distanceRequired: 25,
        finaleEvent: {
            type: "SIMPLE",
            intro: "{HERO_FIRST} finds the Red Dragon in a cavern.",
            paths: [
                {
                    damageMin: 40,
                    damageMax: 60,
                    text: "{HERO_FIRST} fights the dragon and wins after taking some damage."
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
            type: "SIMPLE",
            intro: "{HERO_FIRST} finds the Wicked Witch in an old hut.",
            paths: [
                {
                    triggers: {
                        abilityReq: ["BLESSED"],
                    },
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} is blessed, and defeats the witch easily."
                },
                {
                    triggers: {
                        weaknessReq: ["CURSED"],
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

module.exports = {
    QUESTS
}
