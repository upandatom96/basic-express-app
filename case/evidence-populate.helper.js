const generalUtil = require('../utilities/general.util');

function populatePlaintiffEvidence(myCase, fullCase) {
    fullCase.plaintiffEvidencePool = generalUtil.translateIndicesToValues(myCase.plaintiffEvidencePool, myCase.evidenceValues);
    fullCase.plaintiffEvidenceCourt = generalUtil.translateIndicesToValues(myCase.plaintiffEvidenceCourt, myCase.evidenceValues);
    return fullCase;
}

function populateDefendantEvidence(myCase, fullCase) {
    fullCase.defendantEvidencePool = generalUtil.translateIndicesToValues(myCase.defendantEvidencePool, myCase.evidenceValues);
    fullCase.defendantEvidenceCourt = generalUtil.translateIndicesToValues(myCase.defendantEvidenceCourt, myCase.evidenceValues);
    return fullCase;
}

function populateEvidence(myCase, fullCase) {
    fullCase = populatePlaintiffEvidence(myCase, fullCase);
    fullCase = populateDefendantEvidence(myCase, fullCase);
    return fullCase;
}

module.exports = {
    populateEvidence
};
