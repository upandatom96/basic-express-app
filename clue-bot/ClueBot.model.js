const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClueBotSchema = new Schema({
    revealed: {
        type: Boolean
    },
    person: {
        type: String
    },
    place: {
        type: String
    },
    thing: {
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