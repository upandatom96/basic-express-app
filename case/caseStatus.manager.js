const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const caseBuilder = require('./case-builder.helper');
const statusHelper = require('./case-status.helper');
const evidenceHelper = require('./evidence.helper');
const witnessHelper = require('./witness.helper');
const nameHelper = require('./name.helper');
const caseConstants = require('./case.constants');

const boolUtil = require('../utilities/bool.util');
const issueManager = require('../issue/issue.manager');
const evidenceManager = require('../evidence/evidence.manager');
const witnessManager = require('../witness/witness.manager');

function makeCaseAutomatic() {
    return new Promise((resolve, reject) => {
        Case.find({})
            .then((allCases) => {
                issueManager.getRandomIssue()
                    .then((randomIssue) => {
                        witnessManager.getRandomWitnesses(caseConstants.WITNESS_COUNT)
                            .then((randomWitnesses) => {
                                evidenceManager.getRandomEvidence(caseConstants.EVIDENCE_COUNT)
                                    .then((randomEvidence) => {
                                        const caseAttributes = caseBuilder.buildCaseAttributes(
                                            allCases,
                                            randomIssue,
                                            randomWitnesses,
                                            randomEvidence
                                        );
                                        new Case(caseAttributes)
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
                    if (foundCase && canLockRoles(foundCase)) {
                        foundCase.status = caseConstants.MAKE_SELECTIONS;
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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
                    if (foundCase && canStartTrial(foundCase)) {
                        foundCase.status = caseConstants.FREE_TIME;
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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
                    if (foundCase && canStartTrial(foundCase)) {
                        foundCase.status = caseConstants.OPENING_ARGUMENTS;
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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
                    if (foundCase && canMakeVerdict(foundCase)) {
                        foundCase.status = caseConstants.VERDICT_SELECTION;
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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
                        foundCase.lastStatusUpdateDate = new Date().toISOString();

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

function canMakeVerdict(myCase) {
    return statusHelper.verdictIsNext(myCase) &&
        evidenceHelper.isAllEvidenceRevealed(myCase);
}

function canStartTrial(myCase) {
    const evidenceSelected = evidenceHelper.isAllEvidenceSelected(myCase);
    const witnessesSelected = witnessHelper.isAllWitnessesSelected(myCase);
    const makingSelections = statusHelper.isMakeSelections(myCase);
    return evidenceSelected && witnessesSelected && makingSelections;
}

function canLockRoles(myCase) {
    const assigningRoles = statusHelper.isAssignRoles(myCase);
    const namesSet = nameHelper.areEssentialNamesSet(myCase);
    return assigningRoles && namesSet;
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
