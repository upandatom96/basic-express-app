const boolUtil = require('../utilities/bool.util');

function checkForApplicationCreateErrors(application) {
  const errors = checkForGeneralApplicationErrors(application);
  if (boolUtil.hasValue(application._id)) {
    errors.push({ text: 'New application cannot have an id.' });
  }
  return errors;
}

function checkForApplicationEditErrors(application) {
  const errors = checkForGeneralApplicationErrors(application);
  if (boolUtil.hasNoValue(application._id)) {
    errors.push({ text: 'Editing application must have an id.' });
  }
  return errors;
}

function checkForGeneralApplicationErrors(application) {
  let errors = [];
  if (boolUtil.hasNoValue(application.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoValue(application.description)) {
    errors.push({ text: 'Please add a description' });
  }
  if (boolUtil.hasNoValue(application.link)) {
    errors.push({ text: 'Please add a link' });
  }
  return errors;
}

module.exports = {
  checkForApplicationEditErrors,
  checkForApplicationCreateErrors
}