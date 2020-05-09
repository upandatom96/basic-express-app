const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('issue', IssueSchema);