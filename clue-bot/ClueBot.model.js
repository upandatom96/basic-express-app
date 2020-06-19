const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClueBotSchema = new Schema({
    status: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
    },
    victim: {
        type: String
    },
    culprit: {
        type: String
    },
    scene: {
        type: String
    },
    weapon: {
        type: String
    },
    clues: [
        {
            type: String
        }
    ],
    weaponOptions: [
        {
            type: String
        }
    ],
    sceneOptions: [
        {
            type: String
        }
    ],
    culpritOptions: [
        {
            type: String
        }
    ],
    fakeWeapons: [
        {
            type: String
        }
    ],
    fakeScenes: [
        {
            type: String
        }
    ],
    fakeCulprits: [
        {
            type: String
        }
    ],
    announcements: [
        {
            type: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('clue-bot', ClueBotSchema);