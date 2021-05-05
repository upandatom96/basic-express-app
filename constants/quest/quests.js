const EventTypes = require('./event-types');
const MoveTypes = require('./move-types');
const Conditions = require('./conditions');
const Items = require('./hero-items');
const Allies = require('./hero-allies');
const Dis = require('./hero-disadvantages');

const FLAVOR_QUESTS = [
    {
        name: "Mysterious Egg",
        text: "return the Mysterious Egg",
        destination: "the Giant Nest",
        distanceRequired: 99,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches the Giant Nest and sets the Mysterious Egg down. It hatches into a small dragon.",
            type: EventTypes.FLAVOR,
        },
    },
    {
        name: "Love Letter",
        text: "deliver the Love Letter to the Princess",
        destination: "the Tall Tower",
        distanceRequired: 101,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches the Tall Tower and gives the Love Letter to a guard. You are assured the guard will pass it to the Princess.",
            type: EventTypes.FLAVOR,
        },
    },
    {
        name: "The Ring of Evil",
        text: "throw the Ring of Evil into a nearby volcano",
        destination: "a nearby volcano",
        distanceRequired: 75,
        expPoints: 40,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches a nearby volcano and throws the ring in, avoiding temptation (and style).",
            type: EventTypes.FLAVOR,
        },
    },
    {
        name: "Long-Distance Diplomacy",
        text: "deliver a peace treaty to a nearby castle",
        destination: "a nearby castle",
        distanceRequired: 85,
        expPoints: 45,
        finaleEvent: {
            intro: "{HERO_FIRST} delivers the treaty to castle guards, establishing (some) peace.",
            type: EventTypes.FLAVOR,
        },
    },
    {
        name: "The Bard's Big Gig",
        text: "attend a show The Local Bard is putting on",
        destination: "a nearby theatre",
        distanceRequired: 50,
        expPoints: 25,
        finaleEvent: {
            intro: "{HERO_FIRST} listens to the {RA} sounds of the Bard's music and claps when appropriate.",
            type: EventTypes.FLAVOR,
        },
    },
    {
        name: "The Prayer",
        text: "travel to a temple and praise your god",
        destination: "a nearby temple",
        distanceRequired: 20,
        expPoints: 10,
        finaleEvent: {
            intro: "{HERO_FIRST} enters a {RA} temple and prays to their god.",
            type: EventTypes.FLAVOR,
        },
    },
];
const DIRECT_QUESTS = [
    {
        name: "Blood Sacrifice",
        text: "make a Blood Sacrifice",
        destination: "THE FORBIDDEN ALTAR",
        distanceRequired: 66,
        expPoints: 50,
        finaleEvent: {
            intro: "THE FORBIDDEN ALTAR is glowing softly as {HERO_FIRST} approaches. Something feels wrong.",
            damageMin: 1,
            damageMax: 100,
            text: "On THE FORBIDDEN ALTAR is a FORBIDDEN STONE. {HERO_FIRST} uses it to prick their finger. The altar's glow subsides.",
            type: EventTypes.DIRECT,
        },
    },
    {
        name: "Protect the Princess",
        text: "ensure the Princess arrives safely",
        destination: "the Small Tower",
        distanceRequired: 50,
        expPoints: 45,
        finaleEvent: {
            intro: "A guard greets you at the Small Tower. You have arrived.",
            healMin: 10,
            healMax: 20,
            text: "The tower guards thank you with a small but delicious feast. The Princess is safe... for now.",
            type: EventTypes.DIRECT,
        },
    },
];
const CHOICE_QUESTS = [
    {
        name: "Leap of Faith",
        text: "take a Leap of Faith",
        destination: "the Wide Chasm",
        distanceRequired: 50,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} approaches the ledge and contemplates taking a leap. They notice a pole next to the chasm.",
            type: EventTypes.CHOICE,
            choices: [
                {
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} uses the pole to vault across the chasm. They make it, but land hard on the other end."
                },
                {
                    text: "{HERO_FIRST} decides to truly use faith and make the leap without the pole. They make it gracefully."
                },
            ],
        },
    },
    {
        name: "Buried Treasure",
        text: "find the Captain's buried treasure",
        destination: "the Sunken Cave",
        distanceRequired: 63,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} enters the sunken cave and begins searching for treasure.",
            type: EventTypes.CHOICE,
            choices: [
                {
                    expPoints: 10,
                    text: "{HERO_FIRST} finds a large Golden Chest full of treasures beyond what they expected!"
                },
                {
                    text: "{HERO_FIRST} finds a simple wooden chest with the Captain's Diary inside of it."
                },
            ],
        },
    },
    {
        name: "Dominion's Pizza",
        text: "deliver a Dominion's Pizza.",
        destination: "the Bard College Dorms",
        distanceRequired: 75,
        expPoints: 60,
        finaleEvent: {
            intro: "{HERO_FIRST} reaches the Bard College Dorms and hands off the Pizza.",
            type: EventTypes.CHOICE,
            choices: [
                {
                    expPoints: 100,
                    text: "{HERO_FIRST} receives a large tip for delivering the pizza fresh and hot!"
                },
                {
                    damageMin: 10,
                    damageMax: 20,
                    text: "The customer glares at {HERO_FIRST}, the pizza is cold! The customer gives a 1-star rating."
                },
            ],
        },
    },
];
const PATH_QUESTS = [
    {
        name: "Through the Maze",
        text: "navigate through to the end",
        destination: "the Maze",
        distanceRequired: 50,
        expPoints: 60,
        finaleEvent: {
            intro: "{HERO_FIRST} begins walking through the Maze, unsure where they are headed.",
            type: EventTypes.PATHS,
            paths: [
                {
                    triggers: {
                        wisdomReq: 7,
                    },
                    text: "{HERO_FIRST} is wise enough to always follow the left wall, they make it through easily."
                },
                {
                    triggers: {
                        wisdomReq: 4,
                    },
                    damageMin: 6,
                    damageMax: 9,
                    text: "{HERO_FIRST} makes marks on the wall as they go, and only falls in a couple traps."
                },
                {
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} does not know how to navigate the maze and falls into many traps."
                }
            ],
        },
    },
    {
        name: "The Prince's Party",
        text: "celebrate the Prince's greatness",
        destination: "the Prince's Castle",
        distanceRequired: 40,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} arrives at the party and begins to celebrate.",
            type: EventTypes.PATHS,
            paths: [
                {
                    triggers: {
                        disadvantageReq: Dis.SMELLY,
                    },
                    damageMin: 5,
                    damageMax: 10,
                    text: "{HERO_FIRST} smells bad and is thrown out of the party forcefully."
                },
                {
                    triggers: {
                        itemReq: Items.BOUQUET,
                        loseItem: true,
                    },
                    expPoints: 30,
                    text: "{HERO_FIRST} brought the Prince some flowers. He is delighted and thanks you."
                },
                {
                    triggers: {
                        charismaReq: 5,
                    },
                    expPoints: 25,
                    text: "{HERO_FIRST} is charming and strikes up a lovely conversation with the Prince."
                },
                {
                    text: "{HERO_FIRST} celebrates but did not bring a gift, so they are lightly shunned."
                }
            ],
        },
    },
    {
        name: "The King's Funeral",
        text: "celebrate the King's life",
        destination: "the King's Grave",
        distanceRequired: 100,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} arrives at the King's Grave and begins to mourn.",
            type: EventTypes.PATHS,
            paths: [
                {
                    triggers: {
                        allyReq: Allies.SAD_CLOWN,
                        loseAlly: false,
                    },
                    expPoints: 30,
                    text: "{HERO_FIRST} has the Sad Clown with them. The Sad Clown gives an impactful eulogy."
                },
                {
                    triggers: {
                        charismaReq: 5,
                    },
                    expPoints: 25,
                    text: "{HERO_FIRST} is charming and gives a wonderful eulogy."
                },
                {
                    text: "{HERO_FIRST} gives a decent eulogy."
                }
            ],
        },
    },
    {
        name: "Horse Certification",
        text: "renew their expired Horse License",
        destination: "the Horse DMV",
        distanceRequired: 100,
        expPoints: 50,
        finaleEvent: {
            intro: "{HERO_FIRST} arrives at the Horse DMV and gets in line.",
            type: EventTypes.PATHS,
            paths: [
                {
                    triggers: {
                        itemReq: Items.SADDLE,
                        loseItem: false,
                    },
                    expPoints: 30,
                    distanceBoost: 30,
                    text: "{HERO_FIRST} used their own SADDLE and passed the test with flying colors!"
                },
                {
                    triggers: {
                        dexterityReq: 7,
                    },
                    expPoints: 30,
                    text: "{HERO_FIRST} performs excellently and passes the test!"
                },
                {
                    triggers: {
                        dexterityReq: 5,
                    },
                    expPoints: 10,
                    text: "{HERO_FIRST} makes a few mistakes but manages to pass the test."
                },
                {
                    triggers: {
                        dexterityReq: 3,
                    },
                    damageMin: 10,
                    damageMax: 20,
                    text: "{HERO_FIRST} fails to parallel-park the horse. They narrowly fail."
                },
                {
                    damageMin: 20,
                    damageMax: 40,
                    text: "{HERO_FIRST} gets kicked in the face by the horse. They fail"
                }
            ],
        },
    },
    {
        name: "The Wizard's Riddle",
        text: "defeat the Wizard's Curse by solving their Riddle",
        destination: "the Wizard's Tower",
        distanceRequired: 50,
        expPoints: 30,
        finaleEvent: {
            intro: "{HERO_FIRST} arrives at the wizard's tower and begins plotting.",
            type: EventTypes.PATHS,
            paths: [
                {
                    triggers: {
                        wisdomReq: 10,
                    },
                    expPoints: 100,
                    distanceBoost: 100,
                    text: "{HERO_FIRST} tricks the Wizard with a riddle before they can start theirs!"
                },
                {
                    triggers: {
                        wisdomReq: 7,
                    },
                    text: "{HERO_FIRST} has heard the Wizard's riddle before and solves it easily."
                },
                {
                    triggers: {
                        wisdomReq: 4,
                    },
                    damageMax: 10,
                    damageMin: 5,
                    text: "{HERO_FIRST} gets a headache from the riddle but manages to solve it."
                },
                {
                    triggers: {
                        wisdomReq: 2,
                    },
                    damageMax: 15,
                    damageMin: 20,
                    text: "{HERO_FIRST} gets a bad headache but finds a loophole in the riddle."
                },
                {
                    damageMax: 20,
                    damageMin: 25,
                    text: "{HERO_FIRST} solves the riddle with brute force (and a really bad headache)."
                }
            ],
        },
    },
];
const ENCOUNTER_QUESTS = [
    {
        name: "Dragon's Bounty",
        text: "slay the Red Dragon",
        destination: "the Dragon's Lair",
        distanceRequired: 25,
        expPoints: 70,
        finaleEvent: {
            intro: "The Red Dragon notices {HERO_FIRST} and prepares to fight.",
            enemyName: "Red Dragon",
            defeat: "{HERO_FIRST} has slayed the dragon!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 50,
            enemyHpMax: 50,
            dexterity: 5,
            charisma: 5,
            wisdom: 6,
            strength: 7,
            moves: [
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "CLAW SWIPE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "LAIR TRAP",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "FIRE BREATH",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "GUARD TREASURE",
                },
            ],
        },
    },
    {
        name: "Witch's Curse",
        text: "melt the Wicked Witch",
        destination: "the Witch's Hut",
        distanceRequired: 30,
        expPoints: 70,
        finaleEvent: {
            intro: "The Witch notices {HERO_FIRST} and prepares to fight.",
            enemyName: "Wicked Witch",
            defeat: "{HERO_FIRST} has melted the witch!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 40,
            enemyHpMax: 40,
            dexterity: 3,
            charisma: 3,
            wisdom: 8,
            strength: 3,
            moves: [
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "WIND SPELL",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "ICE SPELL",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "FIRE SPELL",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "PRACTICE SPELL",
                },
            ],
        },
    },
    {
        name: "The Garden of EVIL",
        text: "defeat the Evil Plant",
        destination: "the Mystic Garden",
        distanceRequired: 30,
        expPoints: 40,
        finaleEvent: {
            intro: "The Evil Plant notices {HERO_FIRST} and begins growing towards them.",
            enemyName: "Evil Plant",
            defeat: "{HERO_FIRST} has turned the Evil Plant into fertilizer!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 40,
            enemyHpMax: 40,
            dexterity: 1,
            charisma: 3,
            wisdom: 5,
            strength: 8,
            moves: [
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "FRUIT SHOOT",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "PHEROMONE TRAP",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "TRICKY BRANCHES",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "TRUNK SLAM",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.HEAL,
                    name: "PHOTOSYNTHESIS",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "TAKE ROOT",
                },
            ],
        },
    },
    {
        name: "The Cosmic Horror",
        text: "investigate the Cosmic Horror",
        destination: "the Rift",
        distanceRequired: 30,
        expPoints: 40,
        finaleEvent: {
            intro: "A INDESCRIBABLE BEAST comes out of the Rift as {HERO_FIRST} approaches.",
            enemyName: "Indescribable Beast",
            defeat: "{HERO_FIRST} sighs as the Beast disappears as the Rift closes!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 99,
            enemyHpMax: 99,
            dexterity: 1,
            charisma: 3,
            wisdom: 5,
            strength: 8,
            moves: [
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "SPEED MIRAGE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "APPEALING LIGHT",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "KNOWLEDGE OF THE ANCIENTS",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "SUBLIME SMASH",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.HEAL,
                    name: "AN UNEARTHLY ENERGY",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "SING TO THE RIFT",
                },
            ],
        },
    },
    {
        name: "Shadow Prince's Rise",
        text: "defeat the Shadow Prince",
        destination: "the Dark Forest",
        distanceRequired: 40,
        expPoints: 75,
        finaleEvent: {
            intro: "The Shadow Prince senses {HERO_FIRST} and prepares to fight.",
            enemyName: "Shadow Prince",
            defeat: "{HERO_FIRST} has defeated the Shadow Prince!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 99,
            enemyHpMax: 99,
            dexterity: 9,
            charisma: 9,
            wisdom: 1,
            strength: 1,
            moves: [
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "BEND LIGHT",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "OFFER DARKNESS",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "INSIDIOUS TRICK",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "SHADOW DAGGER",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "ABOLISH LIGHT",
                },
            ],
        },
    },
    {
        name: "The Horrid Lich",
        text: "banish the Lich",
        destination: "the forest of the dead",
        distanceRequired: 20,
        expPoints: 100,
        finaleEvent: {
            intro: "The Lich rises from the ground and approaches {HERO_FIRST}.",
            enemyName: "the Lich",
            defeat: "{HERO_FIRST} has banished the Lich!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 200,
            enemyHpMax: 200,
            dexterity: 1,
            charisma: 1,
            wisdom: 10,
            strength: 2,
            moves: [
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "SHIFTING SOIL",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "SONG OF THE DEAD",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "VISION OF DEATH",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "DEATH'S GRASP",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "RETURN TO THE EARTH",
                },
                {
                    type: MoveTypes.HEAL,
                    name: "ESSENCE OF DEATH",
                    multiplier: 2,
                },
            ],
        },
    },
    {
        name: "Myth of Hydra",
        text: "seek and defeat the Hydra",
        destination: "the Hydra's hideout",
        distanceRequired: 100,
        expPoints: 250,
        finaleEvent: {
            intro: "The Hydra screeches as {HERO_FIRST} approaches.",
            enemyName: "the Hydra",
            defeat: "{HERO_FIRST} has defeated the Hydra!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 15,
            enemyHpMax: 1000,
            dexterity: 2,
            charisma: 2,
            wisdom: 2,
            strength: 6,
            moves: [
                {
                    type: MoveTypes.HEAL,
                    name: "GROW HEAD",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "FIRE BREATH",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "HORRIFYING BITE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "HEAD BASH",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "HEAD-TO-HEAD CONVERSATION",
                },
            ],
        },
    },
    {
        name: "The Beholder's Scheme",
        text: "seek and defeat the Beholder",
        destination: "the Beholder's hideout",
        distanceRequired: 50,
        expPoints: 300,
        finaleEvent: {
            intro: "The Beholder glares as {HERO_FIRST} approaches.",
            enemyName: "the Beholder",
            defeat: "{HERO_FIRST} has defeated the Beholder!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 75,
            enemyHpMax: 75,
            dexterity: 4,
            charisma: 7,
            wisdom: 9,
            strength: 4,
            moves: [
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "DISINTEGRATION RAY",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "FEAR RAY",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "TELEKINETIC RAY",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "HEAT RAY",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "PETRIFICATION RAY",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "CHARM RAY",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "CONSIDER CRIMES",
                },
            ],
        },
    },
    {
        name: "The Diabolical Dwarf",
        text: "stop a nefarious Dwarf's misdeeds",
        destination: "Mount Dwarvious",
        distanceRequired: 100,
        expPoints: 200,
        finaleEvent: {
            intro: "The Diabolical Dwarf grunts as {HERO_FIRST} approaches.",
            enemyName: "the Diabolical Dwarf",
            defeat: "{HERO_FIRST} has defeated the Diabolical Dwarf!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 30,
            enemyHpMax: 30,
            dexterity: 4,
            charisma: 5,
            wisdom: 4,
            strength: 9,
            moves: [
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "THROW DIAMOND",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "SWING PICK-AXE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "THROW COAL",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "DIABOLICAL BARGAIN",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "MINE",
                },
            ],
        },
    },
    {
        name: "The Bees",
        text: "defeat the evil bee spirit",
        destination: "the Evil Hive",
        distanceRequired: 50,
        expPoints: 150,
        finaleEvent: {
            intro: "The Bee Spirit Beezlebuzz grunts as {HERO_FIRST} steps in a honey pool.",
            enemyName: "Beezlebuzz",
            defeat: "{HERO_FIRST} has defeated Beezlebuzz!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 30,
            enemyHpMax: 30,
            dexterity: 6,
            charisma: 5,
            wisdom: 3,
            strength: 3,
            moves: [
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "STINGING CURSE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "SHOOTING STINGER",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "COMMAND BEES",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "MAKE HONEY",
                },
                {
                    type: MoveTypes.HEAL,
                    name: "CONSUME HONEY",
                    multiplier: 2
                },
            ],
        },
    },
    {
        name: "The Barron's Empire",
        text: "assassinate the Barron",
        destination: "the Barron's Mansion",
        distanceRequired: 75,
        expPoints: 100,
        finaleEvent: {
            intro: "The Barron scoffs as {HERO_FIRST} steps into the mansion.",
            enemyName: "the Barron",
            defeat: "{HERO_FIRST} has defeated the Barron!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 10,
            enemyHpMax: 10,
            dexterity: 1,
            charisma: 1,
            wisdom: 1,
            strength: 1,
            moves: [
                {
                    type: MoveTypes.FAIL,
                    name: "SCOFF",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "DAYDREAM ABOUT EMPIRE",
                },
            ],
        },
    },
    {
        name: "The Construct",
        text: "turn off the Construct",
        destination: "the Abandoned Lab",
        distanceRequired: 50,
        expPoints: 100,
        finaleEvent: {
            intro: "The Construct beeps as {HERO_FIRST} steps into the lab.",
            enemyName: "the Construct",
            defeat: "{HERO_FIRST} has turned off the Construct!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 50,
            enemyHpMax: 50,
            dexterity: 3,
            charisma: 3,
            wisdom: 10,
            strength: 10,
            moves: [
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "SMASH FEELINGS",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "COMPUTE FEELINGS",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "FEEL SADNESS",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "FEEL CONFUSION",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "FEEL LONGING",
                },
            ],
        },
    },
    {
        name: "The Evil Sponge",
        text: "destroy the evil sponge",
        destination: "the swampy swamp",
        distanceRequired: 50,
        expPoints: 150,
        finaleEvent: {
            intro: "The Sponge grows as {HERO_FIRST} steps into the swamp.",
            enemyName: "the Sponge",
            defeat: "{HERO_FIRST} has destroyed the sponge!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 100,
            enemyHpMax: 1000,
            dexterity: 1,
            charisma: 1,
            wisdom: 1,
            strength: 1,
            moves: [
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "ROLL",
                    multiplier: 3,
                },
                {
                    type: MoveTypes.HEAL,
                    name: "GROW",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.HEAL,
                    name: "FILTER FEED",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "REST",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "PAUSE",
                },
            ],
        },
    },
    {
        name: "The Dracula",
        text: "defeat the infamous vampire",
        destination: "Dracula's Castle",
        distanceRequired: 50,
        expPoints: 175,
        finaleEvent: {
            intro: "The Dracula answers their door and politely welcomes {HERO_FIRST}.",
            enemyName: "the Dracula",
            defeat: "{HERO_FIRST} has defeated the Dracula!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 75,
            enemyHpMax: 100,
            dexterity: 5,
            charisma: 10,
            wisdom: 5,
            strength: 4,
            moves: [
                {
                    type: MoveTypes.CONDITION,
                    condition: Conditions.VAMPIRISM,
                    name: "BITE NECK",
                },
                {
                    type: MoveTypes.DRAIN,
                    name: "SUCK BLOOD",
                    drainMin: 10,
                    drainMax: 20,
                    healFactor: 0.666,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "SCARY STORY",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "CASTLE BOOBY TRAP",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "SPOOKY SHOVE",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "BITE AS BAT",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "MONOLOGUE",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "DUST OFF CAPE",
                },
            ],
        },
    },
    {
        name: "The Fighting Pits",
        text: "defeat The Champion",
        destination: "the Fighting Pits",
        distanceRequired: 75,
        expPoints: 250,
        finaleEvent: {
            intro: "{HERO_FIRST} steps into the fighting pits. Crowd cheers as The Champion cracks their knuckles.",
            enemyName: "The Champion",
            defeat: "{HERO_FIRST} has defeated The Champion!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 50,
            enemyHpMax: 50,
            dexterity: 5,
            charisma: 10,
            wisdom: 2,
            strength: 10,
            moves: [
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "SHOW-OFF",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.CHARISMA_ATTACK,
                    name: "PLAY OF THE GAME",
                    multiplier: 2,
                },
                {
                    type: MoveTypes.STRENGTH_ATTACK,
                    name: "SUCKER PUNCH",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.DEXTERITY_ATTACK,
                    name: "HIGH KICK",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.WISDOM_ATTACK,
                    name: "WELL-TIMED BLOW",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.HEAL,
                    name: "FOOD FROM THE FANS",
                    multiplier: 1,
                },
                {
                    type: MoveTypes.FAIL,
                    name: "POSE FOR THE FANS",
                },
            ],
        },
    },
    {
        name: "Diamond Dragon Statue",
        text: "destroy the cursed Diamond Dragon Statue",
        destination: "the Gallery",
        distanceRequired: 10,
        expPoints: 500,
        finaleEvent: {
            intro: "{HERO_FIRST} arrives at the Gallery and finds the Impenetrable Statue.",
            enemyName: "The Statue",
            defeat: "{HERO_FIRST} has destroyed the statue!",
            type: EventTypes.ENCOUNTER,
            enemyHpStart: 500,
            enemyHpMax: 500,
            dexterity: 1,
            charisma: 1,
            wisdom: 1,
            strength: 1,
            moves: [
                {
                    type: MoveTypes.FAIL,
                    name: "EXIST",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "SIT",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "STAND",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "STARE",
                },
                {
                    type: MoveTypes.FAIL,
                    name: "BE A STATUE",
                },
            ],
        },
    },
];

const QUESTS = FLAVOR_QUESTS.concat(DIRECT_QUESTS, CHOICE_QUESTS, PATH_QUESTS, ENCOUNTER_QUESTS);

module.exports = {
    QUESTS
}
