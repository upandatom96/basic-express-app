const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChitChatSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    credit: {
        type: String,
        required: false,
    },
    hidden: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('chit-chat', ChitChatSchema);