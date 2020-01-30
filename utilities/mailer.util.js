function sendEmail(recipient, subject, message) {
  console.log(`Sending email | TO: ${recipient} | SUBJECT: ${subject} | MESSAGE: ${message}`);
}

module.exports = {
  sendEmail
}
