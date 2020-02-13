const boolUtil = require('../utilities/bool.util');

function checkForContraptionCreateErrors(contraption) {
  const errors = checkForGeneralContraptionErrors(contraption);
  if (boolUtil.hasValue(contraption._id)) {
    errors.push({ text: 'New contraption cannot have an id.' });
  }
  return errors;
}

function checkForContraptionEditErrors(contraption) {
  const errors = checkForGeneralContraptionErrors(contraption);
  if (boolUtil.hasNoValue(contraption._id)) {
    errors.push({ text: 'Editing contraption must have an id.' });
  }
  return errors;
}

function checkForGeneralContraptionErrors(contraption) {
  let errors = [];
  if (boolUtil.hasNoValue(contraption.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoValue(contraption.type)) {
    errors.push({ text: 'Please add a type' });
  }
  if (boolUtil.hasNoValue(contraption.description)) {
    errors.push({ text: 'Please add a description' });
  }
  if (boolUtil.hasNoValue(contraption.age)) {
    errors.push({ text: 'Please add an age' });
  }
  if (boolUtil.hasNoBoolValue(contraption.used)) {
    errors.push({ text: 'Please add the used attribute' });
  }
  return errors;
}

module.exports = {
  checkForContraptionEditErrors,
  checkForContraptionCreateErrors
}