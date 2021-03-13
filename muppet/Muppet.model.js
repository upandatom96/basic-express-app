const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuppetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('muppet', MuppetSchema);
