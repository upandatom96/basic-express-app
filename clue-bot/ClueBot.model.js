const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClueBotSchema = new Schema({
    status: {
        type: Number,
        default: 0
    },
    solved: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
    },
    manor: {
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
    announcements: [
        {
            type: String
        }
    ],
    dateStarted: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('clue-bot', ClueBotSchema);