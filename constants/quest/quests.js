const QUESTS = [
    {
        code: "Q1",
        type: "STANDARD",
        name: "Dragon's Bounty",
        text: "|HERO| must slay the dragon.",
        distanceRequired: 25,
        finaleEvent: {
            type: "SIMPLE",
            paths: [
                {
                    triggers: null,
                    damageMin: 50,
                    damageMax: 60,
                    text: "|HERO| fights the dragon."
                }
            ],
        },
    },
];

module.exports = {
    QUESTS
}
