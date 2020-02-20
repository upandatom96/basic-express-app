const boolUtil = require('../utilities/bool.util');

function checkForCaseOrderErrors(caseOrder) {
  let errors = [];
  if (boolUtil.hasNoValue(caseOrder.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoValue(caseOrder.witnessCount)) {
    errors.push({ text: 'Please add a witness count' });
  }
  if (boolUtil.hasNoValue(caseOrder.evidenceCount)) {
    errors.push({ text: 'Please add an evidence count' });
  }
  return errors;
}

module.exports = {
  checkForCaseOrderErrors
}