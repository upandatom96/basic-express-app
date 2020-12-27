const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlockDeckSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    blocks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'block'
        }
    ],
    type: {
        type: String,
        required: true,
    },
    deckRule: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String
        }
    ],
    creator: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('blockdeck', BlockDeckSchema);
