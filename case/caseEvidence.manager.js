const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const boolUtil = require('../utilities/bool.util');
const caseUtil = require('./case-helper.util');

function revealEvidence(caseId, evidenceIndex, isPlaintiff) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasEvidenceIndex = boolUtil.hasValue(evidenceIndex);
        if (!hasCaseId || !hasEvidenceIndex) {
            reject("Case id and evidence index required.");
        } else {
            Case.findOne({ _id: caseId })
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (isPlaintiff && !caseUtil.canRevealPlaintiffEvidence(foundCase)) {
                        reject({
                            message: `CANNOT REVEAL EVIDENCE`
                        });
                    } else if (!isPlaintiff && !caseUtil.canRevealDefendantEvidence(foundCase)) {
                        reject({
                            message: `CANNOT REVEAL EVIDENCE`
                        });
                    } else {
                        let evidenceIsRevealable;
                        if (isPlaintiff) {
                            evidenceIsRevealable = foundCase.plaintiffEvidenceSelected.includes(evidenceIndex);
                        } else {
                            evidenceIsRevealable = foundCase.defendantEvidenceSelected.includes(evidenceIndex);
                        }

                        if (!evidenceIsRevealable) {
                            reject({
                                message: 'REVEAL FAILED'
                            });
                        } else {
                            if (isPlaintiff) {
                                foundCase.plaintiffEvidenceCourt.push(evidenceIndex);
                                foundCase.plaintiffEvidenceSelected = foundCase.plaintiffEvidenceSelected.filter((evidence) => {
                                    return evidence !== evidenceIndex;
                                });
                            } else {
                                foundCase.defendantEvidenceCourt.push(evidenceIndex);
                                foundCase.defendantEvidenceSelected = foundCase.defendantEvidenceSelected.filter((evidence) => {
                                    return evidence !== evidenceIndex;
                                });
                            }

                            foundCase.save()
                                .then((updatedCase) => {
                                    resolve(updatedCase);
                                });
                        }
                    }
                });
        }
    });
}

function selectEvidence(caseId, evidenceIndex, isPlaintiff) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasEvidenceIndex = boolUtil.hasValue(evidenceIndex);
        if (!hasCaseId || !hasEvidenceIndex) {
            reject("Case id and evidence index required.");
        } else {
            Case.findOne({ _id: caseId })
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (isPlaintiff && !caseUtil.canSelectPlaintiffEvidence(foundCase)) {
                        reject({
                            message: `CANNOT SELECT EVIDENCE`
                        });
                    } else if (!isPlaintiff && !caseUtil.canSelectDefendantEvidence(foundCase)) {
                        reject({
                            message: `CANNOT SELECT EVIDENCE`
                        });
                    } else {
                        let evidenceIsSelectable;
                        if (isPlaintiff) {
                            evidenceIsSelectable = foundCase.plaintiffEvidencePool.includes(evidenceIndex);
                        } else {
                            evidenceIsSelectable = foundCase.plaintiffEvidencePool.includes(evidenceIndex);
                        }

                        if (!evidenceIsSelectable) {
                            reject({
                                message: 'FAILED TO SELECT'
                            });
                        } else {
                            if (isPlaintiff) {
                                foundCase.plaintiffEvidenceSelected.push(evidenceIndex);
                                foundCase.plaintiffEvidencePool = foundCase.plaintiffEvidencePool.filter((evidence) => {
                                    return evidence !== evidenceIndex;
                                });
                            } else {
                                foundCase.defendantEvidenceSelected.push(evidenceIndex);
                                foundCase.defendantEvidencePool = foundCase.defendantEvidencePool.filter((evidence) => {
                                    return evidence !== evidenceIndex;
                                });
                            }

                            foundCase.save()
                                .then((updatedCase) => {
                                    resolve(updatedCase);
                                });
                        }
                    }
                });
        }
    });
}

module.exports = {
    revealEvidence,
    selectEvidence
}
