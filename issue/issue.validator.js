const boolUtil = require('../utilities/bool.util');

function checkForCreateErrors(issue) {
  const errors = checkForGeneralErrors(issue);
  if (boolUtil.hasValue(issue._id)) {
    errors.push({ text: 'New issue cannot have an id.' });
  }
  return errors;
}

function checkForEditErrors(issue) {
  const errors = checkForGeneralErrors(issue);
  if (boolUtil.hasNoValue(issue._id)) {
    errors.push({ text: 'Editing issue must have an id.' });
  }
  return errors;
}

function checkForGeneralErrors(issue) {
  let errors = [];
  if (boolUtil.hasNoValue(issue.name)) {
    errors.push({ text: 'Please add a name' });
  }
  return errors;
}

module.exports = {
  checkForCreateErrors,
  checkForEditErrors
}