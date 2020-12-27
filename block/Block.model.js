const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlockSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    rule: {
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

mongoose.model('block', BlockSchema);
