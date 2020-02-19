const boolUtil = require('../utilities/bool.util');

function checkForCreateErrors(witness) {
  const errors = checkForGeneralErrors(witness);
  if (boolUtil.hasValue(witness._id)) {
    errors.push({ text: 'New witness cannot have an id.' });
  }
  return errors;
}

function checkForEditErrors(witness) {
  const errors = checkForGeneralErrors(witness);
  if (boolUtil.hasNoValue(witness._id)) {
    errors.push({ text: 'Editing witness must have an id.' });
  }
  return errors;
}

function checkForGeneralErrors(witness) {
  let errors = [];
  if (boolUtil.hasNoValue(witness.name)) {
    errors.push({ text: 'Please add a name' });
  }
  return errors;
}

module.exports = {
  checkForCreateErrors,
  checkForEditErrors
}