const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  closedDate: {
    type: Date,
    default: null
  },
  openedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 0
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
  poolPlaintiffEvidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'evidence'
    }
  ],
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
  poolDefendantEvidence: [
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
  witnesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'witness'
    }
  ],
  judgeName: {
    type: String,
    default: null,
  },
  plaintiffName: {
    type: String,
    default: null,
  },
  defendantName: {
    type: String,
    default: null,
  },
  witnessNames: [
    {
      type: String
    }
  ],
});

mongoose.model('case', CaseSchema);