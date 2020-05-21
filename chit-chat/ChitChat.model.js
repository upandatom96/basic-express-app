const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChitChatSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('chit-chat', ChitChatSchema);