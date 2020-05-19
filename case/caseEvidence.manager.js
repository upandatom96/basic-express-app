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
                    } else if (isPlaintiff && !statusHelper.canRevealPlaintiffEvidence(foundCase)) {
                        reject({
                            message: `CANNOT REVEAL PLAINTIFF EVIDENCE`
                        });
                    } else if (!isPlaintiff && !statusHelper.canRevealDefendantEvidence(foundCase)) {
                        reject({
                            message: `CANNOT REVEAL DEFENDANT EVIDENCE`
                        });
                    } else if (!evidenceHelper.isEvidenceRevealable(foundCase, isPlaintiff, evidenceIndex)) {
                        reject({
                            message: `EVIDENCE NOT VALID`
                        });
                    } else {
                        evidenceHelper.revealEvidence(foundCase, isPlaintiff, evidenceIndex);

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
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
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (isPlaintiff && !statusHelper.canSelectPlaintiffEvidence(foundCase)) {
                        reject({
                            message: `CANNOT SELECT PLAINTIFF EVIDENCE`
                        });
                    } else if (!isPlaintiff && !statusHelper.canSelectDefendantEvidence(foundCase)) {
                        reject({
                            message: `CANNOT SELECT DEFENDANT EVIDENCE`
                        });
                    } else if (!evidenceHelper.isEvidenceSelectable(foundCase, isPlaintiff, evidenceIndex)) {
                        reject({
                            message: `EVIDENCE NOT VALID`
                        });
                    } else {
                        evidenceHelper.selectEvidence(foundCase, isPlaintiff, evidenceIndex);

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    }
                });
        }
    });
}

module.exports = {
    revealEvidence,
    selectEvidence
}
