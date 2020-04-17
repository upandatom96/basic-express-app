const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpectreCardSchema = new Schema({
  deckType: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  cardSubType: {
    type: String,
    required: false,
  },
  valueOne: {
    type: String,
    required: true,
  },
  valueTwo: {
    type: String,
    required: true,
  },
  valueThree: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('spectreCard', SpectreCardSchema);