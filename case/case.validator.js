const boolUtil = require('../utilities/bool.util');

function checkForCaseOrderErrors(caseOrder) {
  let errors = [];
  if (boolUtil.hasNoValue(caseOrder.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoNumberValue(caseOrder.witnessCount)) {
    errors.push({ text: 'Please add a witness count' });
  }
  if (boolUtil.hasNumberValue(caseOrder.witnessCount) && caseOrder.witnessCount > 10) {
    errors.push({ text: 'Witness count must be less than 10' });
  }
  if (boolUtil.hasNoNumberValue(caseOrder.evidenceCount)) {
    errors.push({ text: 'Please add an evidence count' });
  }
  if (boolUtil.hasNumberValue(caseOrder.evidenceCount) && caseOrder.evidenceCount === 0) {
    errors.push({ text: 'Evidence count must be more than zero' });
  }
  if (boolUtil.hasNumberValue(caseOrder.evidenceCount) && caseOrder.evidenceCount > 10) {
    errors.push({ text: 'Evidence count must be less than 10' });
  }
  return errors;
}

function checkForJudgeCaseNotesErrors(caseNotes) {
  let errors = [];
  if (boolUtil.hasNoValue(caseNotes._id)) {
    errors.push({ text: 'Case notes must have a case id' });
  }
  if (boolUtil.hasNoValue(caseNotes.defendantScore)) {
    errors.push({ text: 'Case notes must have a defendant score' });
  }
  if (boolUtil.hasNoValue(caseNotes.plaintiffScore)) {
    errors.push({ text: 'Case notes must have a plaintiff score' });
  }
  return errors;
}

module.exports = {
  checkForCaseOrderErrors,
  checkForJudgeCaseNotesErrors
}