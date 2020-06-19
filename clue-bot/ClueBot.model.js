const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClueBotSchema = new Schema({
    concluded: {
        type: Boolean,
        default: false
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
    unDrawnClues: [
        {
            type: String
        }
    ],
    drawnClues: [
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