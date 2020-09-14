const CHAPTER_EVENTS = [
    {
        type: "SIMPLE",
        distanceMin: 9,
        distanceMax: 11,
        paths: [
            {
                triggers: {
                    strengthReq: 7,
                    wisdomReq: 0,
                    charismaReq: null,
                    dexterityReq: null,
                    abilityReq: [],
                    weaknessReq: null,
                    itemReq: null,
                    allyReq: null,
                },
                healMin: 0,
                healMax: 0,
                damageMin: 1,
                damageMax: 2,
                itemGain: null,
                allyGain: null,
                text: "A goblin attacks! They are strong enough to fight back."
            },
            {
                triggers: null,
                healMin: 0,
                healMax: 0,
                damageMin: 5,
                damageMax: 8,
                itemGain: null,
                allyGain: null,
                text: "A goblin attacks! They are too weak to fight back."
            }
        ],
    },
    {
        type: "SIMPLE",
        distanceMin: 5,
        distanceMax: 7,
        paths: [
            {
                triggers: {
                    wisdomReq: 7,
                },
                text: "A troll emerges. They are wise enough to trick the troll."
            },
            {
                damageMin: 6,
                damageMax: 9,
                text: "A troll emerges. They are hurt by a trap the troll created."
            }
        ],
    },
    {
        type: "SIMPLE",
        distanceMin: 1,
        distanceMax: 10,
        paths: [
            {
                triggers: {
                    charismaReq: 7,
                },
                healMin: 6,
                healMax: 10,
                text: "They convince a fairy to heal them well."
            },
            {
                healMin: 3,
                healMax: 6,
                text: "They find a fairy and get healed a little."
            }
        ],
    },
    {
        type: "SIMPLE",
        distanceMin: 5,
        distanceMax: 7,
        paths: [
            {
                triggers: {
                    dexterityReq: 7,
                },
                text: "They carefully cross a broken bridge."
            },
            {
                damageMin: 5,
                damageMax: 10,
                text: "They fall while trying to cross a broken bridge."
            }
        ],
    },
];

module.exports = {
    CHAPTER_EVENTS
}
