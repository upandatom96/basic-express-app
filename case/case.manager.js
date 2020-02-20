const caseValidator = require('./case.validator');

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
      const newCase = {
        name: myCase.name,
        witnesses: [],
        plantiffEvidence: [],
        defendantEvidence: []
      };
      resolve(
        newCase
      );
    }
  });
}

module.exports = {
  getAllCases,
  makeCase
}