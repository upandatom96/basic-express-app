const boolUtil = require('../utilities/bool.util');

function checkForCreateErrors(evidence) {
  const errors = checkForGeneralErrors(evidence);
  if (boolUtil.hasValue(evidence._id)) {
    errors.push({ text: 'New evidence cannot have an id.' });
  }
  return errors;
}

function checkForEditErrors(evidence) {
  const errors = checkForGeneralErrors(evidence);
  if (boolUtil.hasNoValue(evidence._id)) {
    errors.push({ text: 'Editing evidence must have an id.' });
  }
  return errors;
}

function checkForGeneralErrors(evidence) {
  let errors = [];
  if (boolUtil.hasNoValue(evidence.name)) {
    errors.push({ text: 'Please add a name' });
  }
  return errors;
}

module.exports = {
  checkForCreateErrors,
  checkForEditErrors
}