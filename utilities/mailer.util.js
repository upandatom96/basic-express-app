const sgMail = require('@sendgrid/mail');
const { sendgridApiKey } = require('../config/env.config');

function sendEmail(recipient, subject, message) {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(sendgridApiKey);
  const msg = {
    to: recipient,
    from: 'adamontheinternet.com@gmail.com',
    subject: subject,
    text: message
  };
  sgMail.send(msg);
}

module.exports = {
  sendEmail
}
