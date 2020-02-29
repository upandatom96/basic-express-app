const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const caseValidator = require('./case.validator');
const issueManager = require('../issue/issue.manager');
const evidenceManager = require('../evidence/evidence.manager');
const witnessManager = require('../witness/witness.manager');

function getAllCases() {
  return new Promise((resolve, reject) => {
    Case.find({})
      .sort([['date', -1]])
      .populate("issue")
      .populate("witnesses")
      .populate("plaintiffEvidence")
      .populate("defendantEvidence")
      .populate("witnesses")
      .then((cases) => {
        resolve(cases);
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
      .populate("witnesses")
      .populate("plaintiffEvidence")
      .populate("defendantEvidence")
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
                          witnesses: randomWitnesses,
                          plaintiffEvidence: randomEvidence.plantiffEvidence,
                          defendantEvidence: randomEvidence.defendantEvidence
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
        .populate("witnesses")
        .populate("plaintiffEvidence")
        .populate("defendantEvidence")
        .populate("witnesses")
        .then((foundCase) => {
          if (!foundCase) {
            reject({
              message: `Failed to find case`
            });
          } else {
            foundCase.notes = judgeCaseNotes.notes;
            foundCase.plaintiffScore = judgeCaseNotes.plaintiffScore;
            foundCase.defendantScore = judgeCaseNotes.defendantScore;

            foundCase.save()
              .then((updatedCase) => {
                resolve(updatedCase);
              });
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
  deleteOneCase
}
