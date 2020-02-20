const caseValidator = require('./case.validator');
const issueManager = require('../issue/issue.manager');

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
        const witnesses = pickWitnesses(caseOrder.witnessCount);
        const evidence = pickEvidence(caseOrder.evidenceCount);
        const newCase = {
          name: caseOrder.name,
          issue: randomIssue,
          witnesses,
          plantiffEvidence: evidence.plantiffEvidence,
          defendantEvidence: evidence.defendantEvidence
        };
        resolve(
          newCase
        );
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

function pickWitnesses(witnessCount) {
  const witnesses = [];
  for (i = 0; i < witnessCount; i++) {
    const newWitness = {
      "name": "witness " + (i + 1)
    };
    witnesses.push(newWitness);
  }
  return witnesses;
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
