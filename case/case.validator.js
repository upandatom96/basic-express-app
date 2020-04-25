const boolUtil = require('../utilities/bool.util');

function checkForJudgeCaseNotesErrors(caseNotes) {
  let errors = [];
  if (boolUtil.hasNoValue(caseNotes._id)) {
    errors.push({ text: 'Case notes must have a case id' });
  }
  if (boolUtil.hasNoNumberValue(caseNotes.defendantScore)) {
    errors.push({ text: 'Case notes must have a defendant score' });
  }
  if (boolUtil.hasNoNumberValue(caseNotes.plaintiffScore)) {
    errors.push({ text: 'Case notes must have a plaintiff score' });
  }
  return errors;
}

module.exports = {
  checkForJudgeCaseNotesErrors
}