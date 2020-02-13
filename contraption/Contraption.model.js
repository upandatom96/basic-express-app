const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContraptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  used: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('contraption', ContraptionSchema);