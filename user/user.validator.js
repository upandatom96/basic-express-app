const boolUtil = require('../utilities/bool.util');

function checkForUserRegistrationErrors(user) {
  let errors = [];
  if (boolUtil.hasNoValue(user.email)) {
    errors.push({ text: 'Please add an email' });
  }
  return errors;
}

function comparePasswords(password, confirmPassword) {
  let errors = [];
  if (password !== confirmPassword) {
    errors.push({ text: 'Passwords do not match' });
  }
  return errors;
}

module.exports = {
  checkForUserRegistrationErrors,
  comparePasswords
}