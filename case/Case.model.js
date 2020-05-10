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
    type: String
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
      type: String
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
  witnessName1: {
    type: String,
    default: null,
  },
  witnessName2: {
    type: String,
    default: null,
  },
  witnessName3: {
    type: String,
    default: null,
  },
  witnessName4: {
    type: String,
    default: null,
  },
  witnessName5: {
    type: String,
    default: null,
  },
});

mongoose.model('case', CaseSchema);