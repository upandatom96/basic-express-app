const QUESTS = [
    {
        code: "Q1",
        type: "STANDARD",
        name: "Dragon's Bounty",
        text: "|HERO| must slay the dragon.",
        distanceRequired: 10,
        finaleEvent: {
            code: "F1",
            text: "|HERO| fights a dragon.",
            halfDamageCondition: null,
            noDamageCondition: null,
            hpMin: -50,
            hpMax: -100,
            item: "DRAGON_EGG",
            ally: null,
        },
    },
];

module.exports = {
    QUESTS
}
