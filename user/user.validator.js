const boolUtil = require('../utilities/bool.util');

function checkForUserRegistrationErrors(user) {
  let errors = [];
  if (boolUtil.hasNoValue(user.email)) {
    errors.push({ text: 'Please add an email' });
  }
  return errors;
}

module.exports = {
  checkForUserRegistrationErrors
}