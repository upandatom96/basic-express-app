const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestSchema = new Schema({
    heroId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "The Great Quest"
    },
    objective: {
        type: String,
        required: true,
        default: "retrieve the golden spoon"
    },
    distanceTravelled: {
        type: Number,
        required: true,
        default: 0
    },
    distanceRequired: {
        type: Number,
        required: true,
        default: 10
    },
    finaleEvent: {
      type: String,
      required: true,
    },
    finaleCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    restCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('quest', QuestSchema);
