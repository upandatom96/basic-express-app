const caseValidator = require('./case.validator');
const issueManager = require('../issue/issue.manager');
const evidenceManager = require('../evidence/evidence.manager');
const witnessManager = require('../witness/witness.manager');

function getAllCases() {
  return new Promise((resolve, reject) => {
    resolve(
      []
    );
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
            const newCase = buildCase(caseOrder.name, randomIssue, randomWitnesses, randomEvidence);
            resolve(
              newCase
            );
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

function buildCase(name, issue, witnesses, evidence) {
  return {
    name: name,
    issue: issue,
    witnesses,
    plantiffEvidence: evidence.plantiffEvidence,
    defendantEvidence: evidence.defendantEvidence
  };
}
