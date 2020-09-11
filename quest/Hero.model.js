const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Gribnar Bleck"
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
    level: {
        type: Number,
        required: true,
        default: 1
    },
    storyOver: {
        type: Boolean,
        required: true,
        default: false
    },
    abilityOne: {
        type: String,
        required: true,
        default: "Punch"
    },
    abilityTwo: {
        type: String,
        required: true,
        default: "Kick"
    },
    item: {
        type: String,
    },
    ally: {
        type: String,
    },
    journal: [
        {
            type: String
        }
    ],
    startDate: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('hero', HeroSchema);
