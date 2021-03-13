const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuppetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    debutYear: {
        type: Number,
        required: true,
    },
    commonality: {
        type: String,
        required: true,
    },
    speechType: {
        type: String,
        required: true,
    },
    mainSeries: {
        type: String,
        required: true,
    },
    creature: {
        type: String,
        required: true,
    },
    appearanceAdjectives: [
        {
            type: String
        }
    ],
    attitudeAdjectives: [
        {
            type: String
        }
    ],
    imageLinks: [
        {
            type: String
        }
    ],
    notes: [
        {
            type: String
        }
    ],
    quotes: [
        {
            type: String
        }
    ],
    starQuality: {
        type: Number,
        required: true,
    },
    cuteness: {
        type: Number,
        required: true,
    },
    imagination: {
        type: Number,
        required: true,
    },
    storytelling: {
        type: Number,
        required: true,
    },
    humor: {
        type: Number,
        required: true,
    },
    aloofness: {
        type: Number,
        required: true,
    },
    mischief: {
        type: Number,
        required: true,
    },
    floppiness: {
        type: Number,
        required: true,
    },
    fuzziness: {
        type: Number,
        required: true,
    },
    softness: {
        type: Number,
        required: true,
    },
    strength: {
        type: Number,
        required: true,
    },
    wisdom: {
        type: Number,
        required: true,
    },
    intelligence: {
        type: Number,
        required: true,
    },
    constitution: {
        type: Number,
        required: true,
    },
    charisma: {
        type: Number,
        required: true,
    },
    dexterity: {
        type: Number,
        required: true,
    },
    muppetRank: {
        type: Number,
        required: true,
    },
    alignment: {
        type: String,
        required: true,
    },
    archived: {
      type: Boolean,
      required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('muppet', MuppetSchema);
