const QUESTS = [
    {
        code: "Q1",
        type: "STANDARD",
        name: "Dragon's Bounty",
        text: "|HERO| must slay the Red Dragon.",
        distanceRequired: 25,
        finaleEvent: {
            type: "SIMPLE",
            paths: [
                {
                    damageMin: 40,
                    damageMax: 60,
                    text: "|HERO| fights the dragon and wins after taking some damage."
                }
            ],
        },
    },
    {
        code: "Q2",
        type: "STANDARD",
        name: "Witch's Curse",
        text: "|HERO| must melt the Wicked Witch.",
        distanceRequired: 25,
        finaleEvent: {
            type: "SIMPLE",
            paths: [
                {
                    triggers: {
                        abilityReq: ["BLESSED"],
                    },
                    damageMin: 10,
                    damageMax: 20,
                    text: "|HERO| is blessed, and defeats the witch easily."
                },
                {
                    triggers: {
                        weaknessReq: ["CURSED"],
                    },
                    damageMin: 70,
                    damageMax: 75,
                    text: "|HERO| is cursed, and defeats the witch with much difficulty."
                },
                {
                    damageMin: 30,
                    damageMax: 50,
                    text: "|HERO| fights the witch and wins after taking some damage."
                },
            ],
        },
    },
];

module.exports = {
    QUESTS
}
