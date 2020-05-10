const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const boolUtil = require('../utilities/bool.util');
const caseUtil = require('./case-helper.util');
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
                        witnessManager.getRandomWitnesses(5)
                            .then((randomWitnesses) => {
                                evidenceManager.getRandomEvidence(10)
                                    .then((randomEvidence) => {
                                        new Case({
                                            name: caseName,
                                            issue: randomIssue._id,
                                            witnesses: randomWitnesses,
                                            poolPlaintiffEvidence: randomEvidence.plaintiffEvidence,
                                            poolDefendantEvidence: randomEvidence.defendantEvidence,
                                            status: caseConstants.ASSIGN_ROLES,
                                        })
                                            .save()
                                            .then((addedCase) => {
                                                resolve(addedCase);
                                            });
                                    })
                                    .catch((err) => {
                                        res.statusCode = 500;
                                        res.send(err);
                                    });
                            })
                            .catch((err) => {
                                res.statusCode = 500;
                                res.send(err);
                            });
                    })
                    .catch((err) => {
                        res.statusCode = 500;
                        res.send(err);
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
                    if (foundCase && caseUtil.isCaseStatusOpeningArguments(foundCase)) {
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
                    if (foundCase && caseUtil.isCaseStatusCrossfire(foundCase)) {
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
                    if (foundCase && caseUtil.isCaseStatusVerdictSelection(foundCase)) {
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
