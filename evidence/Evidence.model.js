const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvidenceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('evidence', EvidenceSchema);