const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  issue: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'issue',
    required: true 
  },
  // plantiffEvidence
  // defendantEvidence
  witnesses:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'witness'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('case', CaseSchema);