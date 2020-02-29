const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  plaintiffScore: {
    type: Number,
    default: 0
  },
  defendantScore: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: null
  },
  issue: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'issue',
    required: true 
  },
  plaintiffEvidence:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'evidence'
    }
  ],
  revealedPlaintiffEvidence:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'evidence'
    }
  ],
  defendantEvidence:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'evidence'
    }
  ],
  revealedDefendantEvidence:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'evidence'
    }
  ],
  witnesses:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'witness'
    }
  ],
  revealedWitnesses:[
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