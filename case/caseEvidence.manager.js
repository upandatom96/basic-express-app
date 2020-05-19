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
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (isPlaintiff && !caseUtil.canRevealPlaintiffEvidence(foundCase)) {
                        reject({
                            message: `CANNOT REVEAL PLAINTIFF EVIDENCE`
                        });
                    } else if (!isPlaintiff && !caseUtil.canRevealDefendantEvidence(foundCase)) {
                        reject({
                            message: `CANNOT REVEAL DEFENDANT EVIDENCE`
                        });
                    } else if (!caseUtil.isEvidenceRevealable(foundCase, isPlaintiff, evidenceIndex)) {
                        reject({
                            message: `EVIDENCE NOT VALID`
                        });
                    } else {
                        caseUtil.revealEvidence(foundCase, isPlaintiff, evidenceIndex);

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
                    } else if (isPlaintiff && !caseUtil.canSelectPlaintiffEvidence(foundCase)) {
                        reject({
                            message: `CANNOT SELECT PLAINTIFF EVIDENCE`
                        });
                    } else if (!isPlaintiff && !caseUtil.canSelectDefendantEvidence(foundCase)) {
                        reject({
                            message: `CANNOT SELECT DEFENDANT EVIDENCE`
                        });
                    } else if (!caseUtil.isEvidenceSelectable(foundCase, isPlaintiff, evidenceIndex)) {
                        reject({
                            message: `EVIDENCE NOT VALID`
                        });
                    } else {
                        caseUtil.selectEvidence(foundCase, isPlaintiff, evidenceIndex);

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
