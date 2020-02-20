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
        .then((getRandomWitnesses) => {
          const evidence = pickEvidence(caseOrder.evidenceCount);
          const newCase = buildCase(caseOrder.name, randomIssue, getRandomWitnesses, evidence);
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
    }
  });
}

module.exports = {
  getAllCases,
  makeCase
}

function pickEvidence(evidenceCount) {
  const evidence = {
    plantiffEvidence: [],
    defendantEvidence: []
  };
  for (i = 0; i < evidenceCount; i++) {
    const newEvidenceP = {
      "name": "evidence p " + (i + 1)
    };
    evidence.plantiffEvidence.push(newEvidenceP);
    const newEvidenceD = {
      "name": "evidence d " + (i + 1)
    };
    evidence.defendantEvidence.push(newEvidenceD);
  }
  return evidence;
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
