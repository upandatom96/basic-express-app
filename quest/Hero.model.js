const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Gribnar Bleck"
    },
    creator: {
        type: String,
        default: null
    },
    seed: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    hp: {
        type: Number,
        required: true,
        default: 100
    },
    hpMax: {
        type: Number,
        required: true,
        default: 100
    },
    strength: {
        type: Number,
        required: true,
        default: 5
    },
    wisdom: {
        type: Number,
        required: true,
        default: 5
    },
    charisma: {
        type: Number,
        required: true,
        default: 5
    },
    dexterity: {
        type: Number,
        required: true,
        default: 5
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    distanceBoost: {
        type: Number,
        required: true,
        default: 0
    },
    expPoints: {
        type: Number,
        required: true,
        default: 0
    },
    advantage: {
        type: String,
        required: true,
        default: "BLESSED"
    },
    disadvantage: {
        type: String,
        required: true,
        default: "CURSED"
    },
    journal: [
        {
            type: String
        }
    ],
    inventory: [
        {
            type: String
        }
    ],
    party: [
        {
            type: String
        }
    ],
    currentChapterName: {
        type: String,
        required: false,
    },
    enemyHp: {
        type: Number,
        required: false,
    },
    currentQuestName: {
        type: String,
        required: false,
    },
    distanceTravelled: {
        type: Number,
        required: true,
        default: 0
    },
    distanceTravelledTotal: {
        type: Number,
        required: true,
        default: 0
    },
    damageTakenTotal: {
        type: Number,
        required: true,
        default: 0
    },
    specialMoves: [
        {
            type: String
        }
    ],
    completedQuestLog: [
        {
            type: String
        }
    ],
    completedChapterLog: [
        {
            type: String
        }
    ],
    startDate: {
        type: Date,
        default: Date.now
    },
    deathDate: {
        type: Date,
        default: null
    },
});

mongoose.model('hero', HeroSchema);
