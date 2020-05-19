const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const boolUtil = require('../utilities/bool.util');
const caseUtil = require('./case-helper.util');
const statusHelper = require('./case-status.helper');
const caseConstants = require('./case.constants');
const issueManager = require('../issue/issue.manager');
const evidenceManager = require('../evidence/evidence.manager');
const witnessManager = require('../witness/witness.manager');

function makeCaseAutomatic() {
    return new Promise((resolve, reject) => {
        Case.find({})
            .then((allCases) => {
                const caseName = caseUtil.getUnusedCaseName(allCases);
                issueManager.getRandomIssue()
                    .then((randomIssue) => {
                        witnessManager.getRandomWitnesses(15)
                            .then((randomWitnesses) => {
                                evidenceManager.getRandomEvidence(30)
                                    .then((randomEvidence) => {
                                        const issueText = randomIssue.name;

                                        const witnessValues = [];
                                        const witnessPool1 = [];
                                        const witnessPool2 = [];
                                        const witnessPool3 = [];
                                        const witnessPool4 = [];
                                        const witnessPool5 = [];
                                        randomWitnesses.forEach((witness, index) => {
                                            witnessValues.push(witness.name);
                                            if (index > 11) {
                                                witnessPool1.push(index);
                                            } else if (index > 8) {
                                                witnessPool2.push(index);
                                            } else if (index > 5) {
                                                witnessPool3.push(index);
                                            } else if (index > 2) {
                                                witnessPool4.push(index);
                                            } else {
                                                witnessPool5.push(index);
                                            }
                                        });

                                        const evidenceValues = [];
                                        const plaintiffEvidencePool = [];
                                        const defendantEvidencePool = [];
                                        randomEvidence.forEach((ev, index) => {
                                            evidenceValues.push(ev.name);
                                            if (index > 14) {
                                                plaintiffEvidencePool.push(index);
                                            } else {
                                                defendantEvidencePool.push(index);
                                            }
                                        });

                                        new Case({
                                            name: caseName,
                                            issue: issueText,
                                            witnessValues: witnessValues,
                                            witnessPool1: witnessPool1,
                                            witnessPool2: witnessPool2,
                                            witnessPool3: witnessPool3,
                                            witnessPool4: witnessPool4,
                                            witnessPool5: witnessPool5,
                                            evidenceValues: evidenceValues,
                                            plaintiffEvidencePool: plaintiffEvidencePool,
                                            defendantEvidencePool: defendantEvidencePool,
                                            status: caseConstants.ASSIGN_ROLES,
                                        })
                                            .save()
                                            .then((myCase) => {
                                                resolve(myCase);
                                            });
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
    });
}

function lockRoles(caseId) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId)) {
            reject({message: "need case id"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && caseUtil.canLockRoles(foundCase)) {
                        foundCase.status = caseConstants.MAKE_SELECTIONS;

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to update case.`
                        });
                    }
                });
        }
    });
}

function startFreeTime(caseId) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId)) {
            reject({message: "need case id"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && caseUtil.areSelectionsComplete(foundCase)) {
                        foundCase.status = caseConstants.FREE_TIME;

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to update case.`
                        });
                    }
                });
        }
    });
}

function startOpeningArguments(caseId) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId)) {
            reject({message: "need case id"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && caseUtil.areSelectionsComplete(foundCase)) {
                        foundCase.status = caseConstants.OPENING_ARGUMENTS;

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to update case.`
                        });
                    }
                });
        }
    });
}

function startCrossfire(caseId) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId)) {
            reject({message: "need case id"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && statusHelper.isOpeningArguments(foundCase)) {
                        foundCase.status = caseConstants.CROSSFIRE;

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to update case.`
                        });
                    }
                });
        }
    });
}

function startClosingArguments(caseId) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId)) {
            reject({message: "need case id"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && statusHelper.isCrossfire(foundCase)) {
                        foundCase.status = caseConstants.CLOSING_ARGUMENTS;

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to update case.`
                        });
                    }
                });
        }
    });
}

function startVerdictSelection(caseId) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId)) {
            reject({message: "need case id"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && caseUtil.canMakeVerdict(foundCase)) {
                        foundCase.status = caseConstants.VERDICT_SELECTION;

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to update case.`
                        });
                    }
                });
        }
    });
}

function makeVerdict(caseId, isDefendantGuilty) {
    return new Promise((resolve, reject) => {
        if (boolUtil.hasNoValue(caseId) || boolUtil.hasNoBoolValue(isDefendantGuilty)) {
            reject({message: "cannot make verdict"});
        } else {
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (foundCase && statusHelper.isVerdictSelection(foundCase)) {
                        foundCase.status = caseConstants.CASE_CLOSED;
                        foundCase.isDefendantGuilty = isDefendantGuilty;
                        foundCase.closedDate = new Date().toISOString();

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });
                    } else {
                        reject({
                            message: `Failed to close case`
                        });
                    }
                });
        }
    });
}

module.exports = {
    makeCaseAutomatic,
    lockRoles,
    startFreeTime,
    startOpeningArguments,
    startCrossfire,
    startClosingArguments,
    startVerdictSelection,
    makeVerdict
};
