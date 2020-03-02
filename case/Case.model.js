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
  closed: {
    type: Boolean,
    default: false
  },
  verdict: {
    type: String,
    default: null
  },
  isDefendantGuilty: {
    type: Boolean,
    default: false
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'issue',
    required: true
  },
  unrevealedPlaintiffEvidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'evidence'
    }
  ],
  revealedPlaintiffEvidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'evidence'
    }
  ],
  unrevealedDefendantEvidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'evidence'
    }
  ],
  revealedDefendantEvidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'evidence'
    }
  ],
  unrevealedWitnesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'witness'
    }
  ],
  revealedWitnesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'witness'
    }
  ],
  closedDate: {
    type: Date,
    default: null
  },
  openedDate: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('case', CaseSchema);