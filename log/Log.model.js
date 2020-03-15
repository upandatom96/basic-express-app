const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  application: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('log', LogSchema);