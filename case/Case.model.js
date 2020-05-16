const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    witnessValues: [
        {
            type: String
        }
    ],
    witnessPool1: [
        {
            type: Number
        }
    ],
    witnessPool2: [
        {
            type: Number
        }
    ],
    witnessPool3: [
        {
            type: Number
        }
    ],
    witnessPool4: [
        {
            type: Number
        }
    ],
    witnessPool5: [
        {
            type: Number
        }
    ],
    selectedWitness1: {
        type: Number,
        default: null,
    },
    selectedWitness2: {
        type: Number,
        default: null,
    },
    selectedWitness3: {
        type: Number,
        default: null,
    },
    selectedWitness4: {
        type: Number,
        default: null,
    },
    selectedWitness5: {
        type: Number,
        default: null,
    },
    plaintiffEvidenceValues: [
        {
            type: String
        }
    ],
    plaintiffEvidencePool: [
        {
            type: Number
        }
    ],
    plaintiffEvidenceSelected: [
        {
            type: Number
        }
    ],
    plaintiffEvidenceCourt: [
        {
            type: Number
        }
    ],
    defendantEvidenceValues: [
        {
            type: String
        }
    ],
    defendantEvidencePool: [
        {
            type: Number
        }
    ],
    defendantEvidenceSelected: [
        {
            type: Number
        }
    ],
    defendantEvidenceCourt: [
        {
            type: Number
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