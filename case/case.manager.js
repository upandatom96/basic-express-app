const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const caseValidator = require('./case.validator');
const issueManager = require('../issue/issue.manager');
const evidenceManager = require('../evidence/evidence.manager');
const witnessManager = require('../witness/witness.manager');
const boolUtil = require('../utilities/bool.util');
const randomManager = require('../random/random.manager');

function getAllCases() {
  return new Promise((resolve, reject) => {
    Case.find({})
      .populate("issue")
      .populate("unrevealedPlaintiffEvidence")
      .populate("revealedPlaintiffEvidence")
      .populate("unrevealedDefendantEvidence")
      .populate("revealedDefendantEvidence")
      .populate("witnesses")
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
        sortedCases.closedCases.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.openedDate) - new Date(a.openedDate);
        });
        sortedCases.openCases.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.openedDate) - new Date(a.openedDate);
        });
        resolve(sortedCases);
      });
  });
}

function getCaseById(id) {
  return new Promise((resolve, reject) => {
    Case.findOne({
      _id: id
    })
      .populate("issue")
      .populate("unrevealedPlaintiffEvidence")
      .populate("revealedPlaintiffEvidence")
      .populate("unrevealedDefendantEvidence")
      .populate("revealedDefendantEvidence")
      .populate("witnesses")
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

function makeCaseAutomatic() {
  return new Promise((resolve, reject) => {
    Case.find({})
      .then((allCases) => {
        const oldNames = [];
        allCases.forEach((thisCase) => {
          oldNames.push(thisCase.name);
        });
        let caseName = randomManager.getNewPhrase(oldNames);
        caseName = toTitleCase(caseName);
        issueManager.getRandomIssue()
          .then((randomIssue) => {
            witnessManager.getRandomWitnesses(5)
              .then((randomWitnesses) => {
                evidenceManager.getRandomEvidence(5)
                  .then((randomEvidence) => {
                    new Case({
                      name: caseName,
                      issue: randomIssue._id,
                      witnesses: randomWitnesses,
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
      });
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
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("witnesses")
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

function updateJudgeName(judgeName, caseId) {
  return new Promise((resolve, reject) => {
    if (!judgeName || !caseId) {
      reject("cannot update judge name");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("witnesses")
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
            foundCase.judgeName = judgeName;

            foundCase.save()
              .then((updatedCase) => {
                resolve(updatedCase);
              });
          }
        });
    }
  });
}

function updatePlaintiffName(plaintiffName, caseId) {
  return new Promise((resolve, reject) => {
    if (!plaintiffName || !caseId) {
      reject("cannot update plaintiff name");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("witnesses")
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
            foundCase.plaintiffName = plaintiffName;

            foundCase.save()
              .then((updatedCase) => {
                resolve(updatedCase);
              });
          }
        });
    }
  });
}

function updateDefendantName(defendantName, caseId) {
  return new Promise((resolve, reject) => {
    if (!defendantName || !caseId) {
      reject("cannot update defendant name");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("witnesses")
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
            foundCase.defendantName = defendantName;

            foundCase.save()
              .then((updatedCase) => {
                resolve(updatedCase);
              });
          }
        });
    }
  });
}

function addWitnessName(witnessName, caseId) {
  return new Promise((resolve, reject) => {
    if (!witnessName || !caseId) {
      reject("cannot add witness name");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .populate("witnesses")
        .then((foundCase) => {
          if (!foundCase) {
            reject({
              message: `Failed to find case`
            });
          } else if (foundCase.closed) {
            reject({
              message: `Cannot edit a closed case`
            });
          } else if (foundCase.witnesses.length < 5) {
            reject({
              message: `This case cannot have any more witnesses`
            });
          } else {
            foundCase.witnessNames.push(witnessName);

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
        .populate("witnesses")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
        .then((foundCase) => {
          if (foundCase && canCloseCase(foundCase)) {
            foundCase.closed = true;
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

function revealEvidence(caseId, evidenceId, isPlaintiff) {
  return new Promise((resolve, reject) => {
    const hasCaseId = boolUtil.hasValue(caseId);
    const hasEvidenceId = boolUtil.hasValue(evidenceId);
    if (!hasCaseId || !hasEvidenceId) {
      reject("Case id and evidence id required.");
    } else {
      Case.findOne({ _id: caseId })
        .populate("issue")
        .populate("witnesses")
        .populate("unrevealedPlaintiffEvidence")
        .populate("revealedPlaintiffEvidence")
        .populate("unrevealedDefendantEvidence")
        .populate("revealedDefendantEvidence")
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
  getCaseById,
  makeCaseAutomatic,
  updateJudgeCaseNotes,
  updateJudgeName,
  updatePlaintiffName,
  updateDefendantName,
  addWitnessName,
  revealEvidence,
  deleteOneCase,
  closeCase
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function canCloseCase(myCase) {
  const revealedAllPE = myCase.revealedDefendantEvidence.length === 0;
  const revealedAllDE = myCase.revealedDefendantEvidence.length === 0;
  return revealedAllPE && revealedAllDE;
}
