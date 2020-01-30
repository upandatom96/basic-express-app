function checkForUserRegistrationErrors(user) {
  let errors = [];
  if (!user.email) {
    errors.push({ text: 'Please add an email' });
  }
  return errors;
}

module.exports = {
  checkForUserRegistrationErrors
}