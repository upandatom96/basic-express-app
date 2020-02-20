const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  // name
  // issue
  issue: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'issue',
    required: true 
  },
  // plantiffEvidence
  // defendantEvidence
  // witness
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('case', CaseSchema);