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

function makeCase(caseOrder) {
  return new Promise((resolve, reject) => {
    const errors = caseValidator.checkForCaseOrderErrors(caseOrder);
    if (errors.length > 0) {
      reject(errors);
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
              plantiffEvidence: randomEvidence.plantiffEvidence,
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

module.exports = {
  getAllCases,
  makeCase
}
