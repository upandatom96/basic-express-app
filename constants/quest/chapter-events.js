const CHAPTER_EVENTS = [
    {
        code: "C1",
        intro: "{HERO_FIRST} is minding their own business hiking along when a goblin lunges at them.",
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
                text: "{HERO_FIRST} is strong enough to fight back against the goblin."
            },
            {
                triggers: null,
                healMin: 0,
                healMax: 0,
                damageMin: 5,
                damageMax: 8,
                itemGain: null,
                allyGain: null,
                text: "{HERO_FIRST} takes some damage fighting off the goblin."
            }
        ],
    },
    {
        code: "C2",
        intro: "As {HERO_FIRST} crosses a small bridge, a troll stops them.",
        type: "SIMPLE",
        distanceMin: 5,
        distanceMax: 7,
        paths: [
            {
                triggers: {
                    wisdomReq: 7,
                },
                text: "{HERO_FIRST} is wise enough to trick the troll into letting them pass."
            },
            {
                damageMin: 6,
                damageMax: 9,
                text: "{HERO_FIRST} is tricked by the troll and gets hurt."
            }
        ],
    },
    {
        code: "C3",
        intro: "{HERO_FIRST} hears a whispering in the trees around them. They follow the voice and find a fairy.",
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
                text: "{HERO_FIRST} convinces the fairy to heal them well."
            },
            {
                healMin: 3,
                healMax: 6,
                text: "The fairy heals {HERO_FIRST} a little bit."
            }
        ],
    },
    {
        code: "C4",
        intro: "{HERO_FIRST} reaches a chasm. The only way across is an old wooden bridge.",
        type: "SIMPLE",
        distanceMin: 5,
        distanceMax: 7,
        paths: [
            {
                triggers: {
                    dexterityReq: 7,
                },
                text: "{HERO_FIRST} is agile enough to cross the bridge swiftly."
            },
            {
                damageMin: 5,
                damageMax: 10,
                text: "{HERO_FIRST} falls while trying to cross the bridge."
            }
        ],
    },
];

module.exports = {
    CHAPTER_EVENTS
}
