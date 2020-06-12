const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const boolUtil = require('../utilities/bool.util');
const evidenceHelper = require('./evidence.helper');
const statusHelper = require('./case-status.helper');

function revealEvidence(caseId, evidenceIndex, isPlaintiff) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasEvidenceIndex = boolUtil.hasValue(evidenceIndex);
        if (!hasCaseId || !hasEvidenceIndex) {
            reject("Case id and evidence index required.");
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (!canRevealEvidence(foundCase, isPlaintiff)) {
                        reject({
                            message: `CANNOT REVEAL EVIDENCE`
                        });
                    } else if (!evidenceHelper.isEvidenceInPool(foundCase, isPlaintiff, evidenceIndex)) {
                        reject({
                            message: `EVIDENCE NOT VALID`
                        });
                    } else {
                        evidenceHelper.revealEvidence(foundCase, isPlaintiff, evidenceIndex);
                        const role = isPlaintiff ? `Plaintiff` : `Defendant`;
                        const evidenceName = foundCase.evidenceValues[evidenceIndex];
                        foundCase.logs.push(`The ${role} presented ${evidenceName} as evidence`);

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    }
                });
        }
    });
}

function pickStartingEvidence(caseId, evidenceIndex, isPlaintiff) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasEvidenceIndex = boolUtil.hasValue(evidenceIndex);
        if (!hasCaseId || !hasEvidenceIndex) {
            reject("Case id and evidence index required.");
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (!canPickStartingEvidence(foundCase, isPlaintiff)) {
                        reject({
                            message: `CANNOT PICK STARTING EVIDENCE`
                        });
                    } else if (!evidenceHelper.isEvidenceInPool(foundCase, !isPlaintiff, evidenceIndex)) {
                        reject({
                            message: `EVIDENCE NOT VALID`
                        });
                    } else {
                        evidenceHelper.pickStartingEvidence(foundCase, isPlaintiff, evidenceIndex);
                        const role = isPlaintiff ? `Plaintiff` : `Defendant`;
                        const evidenceName = foundCase.evidenceValues[evidenceIndex];
                        foundCase.logs.push(`The ${role} must use ${evidenceName} as evidence`);

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    }
                });
        }
    });
}

function canRevealEvidence(myCase, isPlaintiff) {
    const caseInProgress = statusHelper.isInProgress(myCase);
    const roleHasEvidenceLeft = !roleRevealedAll(myCase, isPlaintiff);
    return caseInProgress && roleHasEvidenceLeft;
}

function canPickStartingEvidence(myCase, isPlaintiff) {
    const makingSelections = statusHelper.isMakeSelections(myCase);
    const roleHasEvidenceLeft = !roleStartingEvidenceReady(myCase, isPlaintiff);
    return makingSelections && roleHasEvidenceLeft;
}

function roleRevealedAll(myCase, isPlaintiff) {
    if (isPlaintiff) {
        return evidenceHelper.isAllPlaintiffEvidenceRevealed(myCase);
    } else {
        return evidenceHelper.isAllDefendantEvidenceRevealed(myCase);
    }
}

function roleStartingEvidenceReady(myCase, isPlaintiff) {
    if (isPlaintiff) {
        return evidenceHelper.isStartingPlaintiffEvidenceRevealed(myCase);
    } else {
        return evidenceHelper.isStartingDefendantEvidenceRevealed(myCase);
    }
}

module.exports = {
    revealEvidence,
    pickStartingEvidence
}
