const EventTypes = require('./event-types');
const MoveTypes = require('./move-types');

const FLAVOR_EVENTS = [
    {
        code: "DOG",
        intro: "{HERO_FIRST} walks by a traveller with a dog. With permission, they pet the dog.",
        type: EventTypes.FLAVOR,
    },
];
const DIRECT_EVENTS = [
    {
        code: "CAT",
        intro: "As they walk, {HERO_FIRST} notices a stray cat.",
        damageMin: 1,
        damageMax: 2,
        text: "The cat accepts pets for a moment, then bites {HERO_FIRST}.",
        type: EventTypes.DIRECT,
    },
];
const CHOICE_EVENTS = [
    {
        code: "BEANS",
        intro: "A cloaked figure offers {HERO_FIRST} a handful of beans.",
        type: EventTypes.CHOICE,
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
const PATH_EVENTS = [
    {
        code: "TROLL_BRIDGE",
        intro: "As {HERO_FIRST} crosses a small bridge, a troll stops them.",
        type: EventTypes.PATHS,
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
        type: EventTypes.PATHS,
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
        type: EventTypes.PATHS,
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
const ENCOUNTER_EVENTS = [
    {
        code: "GOBLIN",
        intro: "A goblin blocks the path ahead. {HERO_FIRST} prepares to fight.",
        enemyName: "Goblin",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 10,
        enemyHpMax: 10,
        dexterity: 3,
        charisma: 3,
        wisdom: 3,
        strength: 6,
        moves: [
            {
                type: MoveTypes.HEAL,
                name: "GOBLIN SNACKS",
                multiplier: 1,
            },
            {
                type: MoveTypes.STRENGTH_ATTACK,
                name: "GOBLIN PUNCH",
                multiplier: 1,
            },
            {
                type: MoveTypes.FAIL,
                name: "GOBLIN ITCH",
            },
        ],
    },
    {
        code: "HEDGEHOG",
        intro: "A hedgehog begins chasing after {HERO_FIRST}.",
        enemyName: "Hedgehog",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 10,
        enemyHpMax: 10,
        dexterity: 6,
        charisma: 3,
        wisdom: 3,
        strength: 3,
        moves: [
            {
                type: MoveTypes.HEAL,
                name: "HEDGEHOG HUDDLE",
                multiplier: 1,
            },
            {
                type: MoveTypes.DEXTERITY_ATTACK,
                name: "DASH",
                multiplier: 1,
            },
            {
                type: MoveTypes.DEXTERITY_ATTACK,
                name: "TORNADO",
                multiplier: 2,
            },
            {
                type: MoveTypes.FAIL,
                name: "TAUNT",
            },
        ],
    },
];

const CHAPTER_EVENTS = FLAVOR_EVENTS.concat(DIRECT_EVENTS, CHOICE_EVENTS, PATH_EVENTS, ENCOUNTER_EVENTS);

module.exports = {
    CHAPTER_EVENTS
}
