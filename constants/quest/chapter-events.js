const EventTypes = require('./event-types');
const MoveTypes = require('./move-types');

const FLAVOR_EVENTS = [
    {
        code: "DOG",
        intro: "{HERO_FIRST} walks by a traveller with a dog. With permission, they pet the dog.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "AURA",
        intro: "{HERO_FIRST} feels a strange aura as they pass an ancient obelisk. They decide it is better to ignore for now.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "NEWS_1",
        intro: "{HERO_FIRST} walks past a Bard who tells them the news, apparently the Prince has a new Princess.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "NEWS_2",
        intro: "{HERO_FIRST} walks past a Bard who tells them the news, chain mail is the new high fashion.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "NEWS_3",
        intro: "{HERO_FIRST} walks past a Bard who tells them the news, there are reports that the stars are fake.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "NEWS_4",
        intro: "{HERO_FIRST} walks past a Bard who tells them the news, supposedly the world is round.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "NEWS_5",
        intro: "{HERO_FIRST} walks past a Bard who tells them the news, rumor has it the King is actually a reptile.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "ROCK_ART",
        intro: "{HERO_FIRST} examines rock carvings as they pass through a cave. They carve their name into the cave wall.",
        type: EventTypes.FLAVOR,
    },
    {
        code: "VIEW",
        intro: "{HERO_FIRST} stops for a moment and enjoys the view as they pass through a valley.",
        type: EventTypes.FLAVOR,
    },
];
const DIRECT_EVENTS = [
    {
        code: "CAT",
        intro: "As they walk, {HERO_FIRST} notices a stray cat.",
        damageMin: 4,
        damageMax: 8,
        text: "The cat accepts pets for a moment, then bites {HERO_FIRST}.",
        type: EventTypes.DIRECT,
    },
    {
        code: "TRIP_FALL",
        intro: "{HERO_FIRST} gets distracted as they walk.",
        damageMin: 5,
        damageMax: 7,
        text: "{HERO_FIRST} trips and falls hard.",
        type: EventTypes.DIRECT,
    },
    {
        code: "FIND_KEY",
        intro: "{HERO_FIRST} spots something shiny in the grass.",
        item: "SMALL KEY",
        text: "{HERO_FIRST} feels around the grass and finds a SMALL KEY.",
        type: EventTypes.DIRECT,
    },
    {
        code: "FIND_CHILD",
        intro: "{HERO_FIRST} finds a child wandering around the forest.",
        ally: "LOST CHILD",
        text: "{HERO_FIRST} decides to invite the LOST CHILD to come with them.",
        type: EventTypes.DIRECT,
    },
    {
        code: "DIRTY_DICE",
        intro: "{HERO_FIRST} notices some loose dirt along the path.",
        item: "DICE",
        text: "{HERO_FIRST} digs at the loose dirt and finds DICE buried.",
        type: EventTypes.DIRECT,
    },
    {
        code: "RED_BERRIES",
        intro: "{HERO_FIRST} spots a Red Berry Bush near the path. They pick a handful.",
        healMin: 4,
        healMax: 7,
        text: "{HERO_FIRST} eats a handful of the nutritious Red Berries.",
        type: EventTypes.DIRECT,
    },
    {
        code: "MAROON_BERRIES",
        intro: "{HERO_FIRST} spots a Red Berry Bush near the path. They pick a handful.",
        damageMin: 4,
        damageMax: 7,
        text: "{HERO_FIRST} eats some berries, not realizing they were poisonous Maroon Berries, not Red Berries.",
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
                healMin: 2,
                healMax: 4,
                text: "{HERO_FIRST} accepts the beans. They make for a nice snack."
            },
            {
                text: "{HERO_FIRST} rejects the bean offer and continues walking."
            },
        ],
    },
    {
        code: "FORKED_ROAD",
        intro: "{HERO_FIRST} reaches a fork in the road, they can go East or West.",
        type: EventTypes.CHOICE,
        choices: [
            {
                text: "{HERO_FIRST} goes West towards some Spooky Woods."
            },
            {
                text: "{HERO_FIRST} goes East towards a Swampy River."
            },
        ],
    },
    {
        code: "CARNIVAL",
        intro: "{HERO_FIRST} stops by a carnival near a small town.",
        type: EventTypes.CHOICE,
        choices: [
            {
                item: "TEDDY BEAR",
                text: "{HERO_FIRST} plays Ring Toss and wins a TEDDY BEAR."
            },
            {
                ally: "SAD CLOWN",
                text: "{HERO_FIRST} watches a show and listens to a SAD CLOWN's story."
            },
            {
                text: "{HERO_FIRST} has some not-very-nutritious carnival snacks."
            },
        ],
    },
    {
        code: "DEMON_DEAL",
        intro: "{HERO_FIRST} reaches a Crossroads and is met by a Demon. The Demon offers a deal.",
        type: EventTypes.CHOICE,
        choices: [
            {
                text: "{HERO_FIRST} turns down the deal. The Demon is annoyed and disappears."
            },
            {
                distanceBoost: 20,
                luckBoost: 20,
                expPoints: 20,
                damageMin: 10,
                damageMax: 20,
                text: "{HERO_FIRST} accepts the deal. The Demon takes some of their soul... for what?",
            },
        ],
    },
    {
        code: "FLOWER_GARDEN",
        intro: "{HERO_FIRST} passes by a beautiful garden.",
        type: EventTypes.CHOICE,
        choices: [
            {
                text: "{HERO_FIRST} takes a moment to smell the roses."
            },
            {
                item: "BOUQUET",
                text: "{HERO_FIRST} picks some flowers to carry with them.",
            },
        ],
    },
    {
        code: "SWIM_BREAK",
        intro: "{HERO_FIRST} sits for a moment by a river.",
        type: EventTypes.CHOICE,
        choices: [
            {
                text: "{HERO_FIRST} decides to go for a swim. They have a pleasant swim",
            },
            {
                damageMax: 5,
                damageMin: 10,
                text: "{HERO_FIRST} decides to go for a swim. As they get out, they notice they are covered in leeches.",
            },
            {
                text: "{HERO_FIRST} decides to just sit there and listen to the river flow.",
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
        defeat: "{HERO_FIRST} has defeated the goblin!",
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
        defeat: "The hedgehog was not fast enough to beat {HERO_FIRST}!",
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
                name: "RUN IN PLACE",
            },
        ],
    },
    {
        code: "FIRE_WIZARD",
        intro: "A fireball flies in front of {HERO_FIRST}. There's a Fire Wizard nearby!",
        enemyName: "Fire Wizard",
        defeat: "{HERO_FIRST} has defeated the wizard!",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 10,
        enemyHpMax: 10,
        dexterity: 3,
        charisma: 3,
        wisdom: 6,
        strength: 3,
        moves: [
            {
                type: MoveTypes.HEAL,
                name: "HEALING FLAME",
                multiplier: 2,
            },
            {
                type: MoveTypes.WISDOM_ATTACK,
                name: "FIRE BALL",
                multiplier: 1,
            },
            {
                type: MoveTypes.WISDOM_ATTACK,
                name: "FIRE BALL",
                multiplier: 2,
            },
            {
                type: MoveTypes.FAIL,
                name: "READ SPELL BOOK",
            },
            {
                type: MoveTypes.FAIL,
                name: "RECHARGE MAGIC",
            },
        ],
    },
    {
        code: "TRICKSTER",
        intro: "{HERO_FIRST} hears a menacing laugh. There's a Trickster nearby!",
        enemyName: "Trickster",
        defeat: "{HERO_FIRST} has defeated the trickster! Or did they?",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 10,
        enemyHpMax: 10,
        dexterity: 3,
        charisma: 3,
        wisdom: 3,
        strength: 6,
        moves: [
            {
                type: MoveTypes.CHARISMA_ATTACK,
                name: "HURTFUL JOKE",
                multiplier: 1,
            },
            {
                type: MoveTypes.CHARISMA_ATTACK,
                name: "DANGEROUS PRANK",
                multiplier: 2,
            },
            {
                type: MoveTypes.FAIL,
                name: "TAUNT",
            },
            {
                type: MoveTypes.FAIL,
                name: "LAUGH",
            },
        ],
    },
    {
        code: "BEAR",
        intro: "{HERO_FIRST} hears a roar in the woods nearby. There is a bear!",
        enemyName: "Bear",
        defeat: "{HERO_FIRST} has defeated the bear!",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 6,
        enemyHpMax: 6,
        dexterity: 7,
        charisma: 1,
        wisdom: 1,
        strength: 7,
        moves: [
            {
                type: MoveTypes.STRENGTH_ATTACK,
                name: "CLAW SWIPE",
                multiplier: 1,
            },
            {
                type: MoveTypes.DEXTERITY_ATTACK,
                name: "BEAR RUSH",
                multiplier: 1,
            },
            {
                type: MoveTypes.FAIL,
                name: "ROAR",
            },
        ],
    },
    {
        code: "SPIRIT",
        intro: "{HERO_FIRST} feels a presence. There is a Spirit nearby!",
        enemyName: "Spirit",
        defeat: "{HERO_FIRST} has defeated the Spirit!",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 20,
        enemyHpMax: 20,
        dexterity: 8,
        charisma: 1,
        wisdom: 8,
        strength: 1,
        moves: [
            {
                type: MoveTypes.CHARISMA_ATTACK,
                name: "GHASTLY TRICK",
                multiplier: 1,
            },
            {
                type: MoveTypes.DEXTERITY_ATTACK,
                name: "GHASTLY SPIN",
                multiplier: 1,
            },
            {
                type: MoveTypes.WISDOM_ATTACK,
                name: "GHASTLY VISION",
                multiplier: 1,
            },
            {
                type: MoveTypes.WISDOM_ATTACK,
                name: "REVEAL DARK SECRET",
                multiplier: 3,
            },
            {
                type: MoveTypes.FAIL,
                name: "MOAN",
            },
        ],
    },
    {
        code: "GIANT_LIZARD",
        intro: "{HERO_FIRST} sees a lizard that appears very close. Wait, no, it is a far away Lizard that is Giant!",
        enemyName: "Giant Lizard",
        defeat: "{HERO_FIRST} has defeated the Giant Lizard!",
        type: EventTypes.ENCOUNTER,
        enemyHpStart: 20,
        enemyHpMax: 20,
        dexterity: 2,
        charisma: 3,
        wisdom: 4,
        strength: 8,
        moves: [
            {
                type: MoveTypes.CHARISMA_ATTACK,
                name: "REPTILIAN TRICK",
                multiplier: 1,
            },
            {
                type: MoveTypes.DEXTERITY_ATTACK,
                name: "REPTILIAN SLASH",
                multiplier: 1,
            },
            {
                type: MoveTypes.WISDOM_ATTACK,
                name: "REPTILIAN TRAP",
                multiplier: 1,
            },
            {
                type: MoveTypes.STRENGTH_ATTACK,
                name: "LIZARD LICK",
                multiplier: 1,
            },
            {
                type: MoveTypes.FAIL,
                name: "LOSE TAIL",
            },
        ],
    },
];

const CHAPTER_EVENTS = FLAVOR_EVENTS.concat(DIRECT_EVENTS, CHOICE_EVENTS, PATH_EVENTS, ENCOUNTER_EVENTS);

module.exports = {
    CHAPTER_EVENTS
}
