const ChapterTypes = require('./chapter-event-types');

const CHAPTER_EVENTS = [
    {
        code: "DOG",
        intro: "{HERO_FIRST} walks by a traveller with a dog. With permission, they pet the dog.",
        type: ChapterTypes.FLAVOR,
    },
    {
        code: "TROLL_BRIDGE",
        intro: "As {HERO_FIRST} crosses a small bridge, a troll stops them.",
        type: ChapterTypes.PATHS,
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
        code: "FAIRY",
        intro: "{HERO_FIRST} hears a whispering in the trees around them. They follow the voice and find a fairy.",
        type: ChapterTypes.PATHS,
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
        code: "CHASM",
        intro: "{HERO_FIRST} reaches a chasm. The only way across is an old wooden bridge.",
        type: ChapterTypes.PATHS,
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
    {
        code: "BEANS",
        intro: "A cloaked figure offers {HERO_FIRST} a handful of beans.",
        type: ChapterTypes.CHOICE,
        choices: [
            {
                healMin: 1,
                healMax: 2,
                text: "{HERO_FIRST} accepts the beans. They make for a nice snack."
            },
            {
                text: "{HERO_FIRST} rejects the bean offer and continues walking."
            },
        ],
    },
];

module.exports = {
    CHAPTER_EVENTS
}
