const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const boolUtil = require('../utilities/bool.util');
const caseUtil = require('./case-helper.util');

function revealEvidence(caseId, evidenceId, isPlaintiff) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasEvidenceId = boolUtil.hasValue(evidenceId);
        if (!hasCaseId || !hasEvidenceId) {
            reject("Case id and evidence id required.");
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
                        let evidenceToReveal;
                        if (isPlaintiff) {
                            evidenceToReveal = foundCase.unrevealedPlaintiffEvidence.find((evidence) => {
                                return evidence._id.toString() === evidenceId;
                            });
                        } else {
                            evidenceToReveal = foundCase.unrevealedDefendantEvidence.find((evidence) => {
                                return evidence._id.toString() === evidenceId;
                            });
                        }

                        if (!evidenceToReveal) {
                            reject({
                                message: 'Failed to find the evidence'
                            });
                        } else {
                            if (isPlaintiff) {
                                foundCase.revealedPlaintiffEvidence.push(evidenceToReveal);
                                foundCase.unrevealedPlaintiffEvidence = foundCase.unrevealedPlaintiffEvidence.filter((evidence) => {
                                    return evidence._id.toString() != evidenceId;
                                });
                            } else {
                                foundCase.revealedDefendantEvidence.push(evidenceToReveal);
                                foundCase.unrevealedDefendantEvidence = foundCase.unrevealedDefendantEvidence.filter((evidence) => {
                                    return evidence._id.toString() != evidenceId;
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

function selectEvidence(caseId, evidenceId, isPlaintiff) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasEvidenceId = boolUtil.hasValue(evidenceId);
        if (!hasCaseId || !hasEvidenceId) {
            reject("Case id and evidence id required.");
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
                        let evidenceToSelect;
                        if (isPlaintiff) {
                            evidenceToSelect = foundCase.poolPlaintiffEvidence.find((evidence) => {
                                return evidence._id.toString() === evidenceId;
                            });
                        } else {
                            evidenceToSelect = foundCase.poolDefendantEvidence.find((evidence) => {
                                return evidence._id.toString() === evidenceId;
                            });
                        }

                        if (!evidenceToSelect) {
                            reject({
                                message: 'Failed to find the evidence'
                            });
                        } else {
                            if (isPlaintiff) {
                                foundCase.unrevealedPlaintiffEvidence.push(evidenceToSelect);
                                foundCase.poolPlaintiffEvidence = foundCase.poolPlaintiffEvidence.filter((evidence) => {
                                    return evidence._id.toString() != evidenceId;
                                });
                            } else {
                                foundCase.unrevealedDefendantEvidence.push(evidenceToSelect);
                                foundCase.poolDefendantEvidence = foundCase.poolDefendantEvidence.filter((evidence) => {
                                    return evidence._id.toString() != evidenceId;
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
