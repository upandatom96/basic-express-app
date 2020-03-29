const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const caseValidator = require('./case.validator');
const issueManager = require('../issue/issue.manager');
const evidenceManager = require('../evidence/evidence.manager');
const witnessManager = require('../witness/witness.manager');
const boolUtil = require('../utilities/bool.util');

function getAllCases() {
  return new Promise((resolve, reject) => {
    Case.find({})
      .populate("issue")
      .populate("unrevealedWitnesses")
      .populate("unrevealedPlaintiffEvidence")
      .populate("revealedPlaintiffEvidence")
      .populate("unrevealedDefendantEvidence")
      .populate("revealedDefendantEvidence")
      .populate("unrevealedWitnesses")
      .populate("revealedWitnesses")
      .then((allCases) => {
        const sortedCases = {
          openCases: [],
          closedCases: [],
        };
        allCases.forEach((myCase) => {
          if (myCase.closed) {
            sortedCases.closedCases.push(myCase);
          } else {
            sortedCases.openCases.push(myCase);
          }
        });
        sortedCases.closedCases.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.openedDate) - new Date(a.openedDate);
        });
        sortedCases.openCases.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.openedDate) - new Date(a.openedDate);
        });
        resolve(sortedCases);
      });
  });
}

function getAllCaseNames() {
  return new Promise((resolve, reject) => {
    Case.find({})
      .select('name')
      .then((cases) => {
        const names = [];
        cases.forEach((myCase) => {
          names.push(myCase.name);
        });
        resolve(names);
      });
  });
}

function getCaseById(id) {
  return new Promise((resolve, reject) => {
    Case.findOne({
      _id: id
    })
      .populate("issue")
      .populate("unrevealedWitnesses")
      .populate("unrevealedPlaintiffEvidence")
      .populate("revealedPlaintiffEvidence")
      .populate("unrevealedDefendantEvidence")
      .populate("revealedDefendantEvidence")
      .populate("unrevealedWitnesses")
      .populate("revealedWitnesses")
      .then((myCase) => {
        if (myCase) {
          resolve(myCase);
        } else {
          reject({
            message: "Failed to find case"
          });
        }
      });
  });
}

function makeCase(caseOrder) {
  return new Promise((resolve, reject) => {
    const errors = caseValidator.checkForCaseOrderErrors(caseOrder);
    if (errors.length > 0) {
      reject(errors);
    } else {
      Case.find({ name: caseOrder.name })
        .then((foundCase) => {
          if (foundCase && foundCase.length > 0) {
            reject({ message: "A case with this name already exists" });
          } else {
            issueManager.getRandomIssue()
              .then((randomIssue) => {
                witnessManager.getRandomWitnesses(caseOrder.witnessCount)
                  .then((randomWitnesses) => {
                    evidenceManager.getRandomEvidence(caseOrder.evidenceCount)
                      .then((randomEvidence) => {
                        new Case({
                          name: caseOrder.name,
                          issue: randomIssue._id,
                          unrevealedWitnesses: randomWitnesses,
                          unrevealedPlaintiffEvidence: randomEvidence.plaintiffEvidence,
                          unrevealedDefendantEvidence: randomEvidence.defendantEvidence
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
          }
        });
    }
  });
}

function updateJudgeCaseNotes(judgeCaseNotes) {
  return new Promise((resolve, reject) => {
    const errors = caseValidator.checkForJudgeCaseNotesErrors(judgeCaseNotes);
    if (errors.length > 0) {
      reject(errors);
    } else {
      Case.findOne({ _id: judgeCaseNotes._id })
        .populate("issue")
        .populate("unrevealedWitnesses")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("unrevealedWitnesses")
        .populate("revealedWitnesses")
        .then((foundCase) => {
          if (!foundCase) {
            reject({
              message: `Failed to find case`
            });
          } else if (foundCase.closed) {
            reject({
              message: `Cannot edit a closed case`
            });
          } else {
            foundCase.notes = judgeCaseNotes.notes;
            foundCase.plaintiffScore = judgeCaseNotes.plaintiffScore;
            foundCase.defendantScore = judgeCaseNotes.defendantScore;
            foundCase.verdict = judgeCaseNotes.verdict;
            foundCase.isDefendantGuilty = judgeCaseNotes.isDefendantGuilty;

            foundCase.save()
              .then((updatedCase) => {
                resolve(updatedCase);
              });
          }
        });
    }
  });
}

function closeCase(caseId, isDefendantGuilty) {
  return new Promise((resolve, reject) => {
    if (boolUtil.hasNoValue(caseId) || boolUtil.hasNoBoolValue(isDefendantGuilty)) {
      reject({ message: "cannot close case" });
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedWitnesses")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("unrevealedWitnesses")
        .populate("revealedWitnesses")
        .then((foundCase) => {
          if (!foundCase) {
            reject({
              message: `Failed to find case`
            });
          } else if (boolUtil.hasNoValue(foundCase.verdict)) {
            reject({
              message: `Cannot close case without a verdict`
            });
          } else {
            foundCase.closed = true;
            foundCase.isDefendantGuilty = isDefendantGuilty;
            foundCase.closedDate = new Date().toISOString();

            foundCase.save()
              .then((updatedCase) => {
                resolve(updatedCase);
              });
          }
        });
    }
  });
}

function revealWitness(caseId, witnessId) {
  return new Promise((resolve, reject) => {
    const hasCaseId = boolUtil.hasValue(caseId);
    const hasWitnessId = boolUtil.hasValue(witnessId);
    if (!hasCaseId || !hasWitnessId) {
      reject("Case id and witness id required.");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedWitnesses")
        .populate("unrevealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("unrevealedWitnesses")
        .populate("revealedWitnesses")
        .then((foundCase) => {
          if (!foundCase) {
            reject({
              message: `Failed to find case`
            });
          } else if (foundCase.closed) {
            reject({
              message: `Cannot edit a closed case`
            });
          } else {
            const witnessToReveal = foundCase.unrevealedWitnesses.find((witness) => {
              return witness._id.toString() === witnessId;
            });

            if (!witnessToReveal) {
              reject({
                message: 'Failed to find the witness'
              });
            } else {
              foundCase.revealedWitnesses.push(witnessToReveal);
              foundCase.unrevealedWitnesses = foundCase.unrevealedWitnesses.filter((witness) => {
                return witness._id.toString() != witnessId;
              });

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

function revealEvidence(caseId, evidenceId, isPlaintiff) {
  return new Promise((resolve, reject) => {
    const hasCaseId = boolUtil.hasValue(caseId);
    const hasEvidenceId = boolUtil.hasValue(evidenceId);
    if (!hasCaseId || !hasEvidenceId) {
      reject("Case id and evidence id required.");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedWitnesses")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("unrevealedWitnesses")
        .populate("revealedWitnesses")
        .then((foundCase) => {
          if (!foundCase) {
            reject({
              message: `Failed to find case`
            });
          } else if (foundCase.closed) {
            reject({
              message: `Cannot edit a closed case`
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

function deleteOneCase(id) {
  return new Promise((resolve, reject) => {
    Case.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Case with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllCases,
  getAllCaseNames,
  getCaseById,
  makeCase,
  updateJudgeCaseNotes,
  revealWitness,
  revealEvidence,
  deleteOneCase,
  closeCase
}
