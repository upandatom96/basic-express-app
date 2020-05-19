const sgMail = require('@sendgrid/mail');
const {sendgridApiKey, test} = require('../config/env.config');

function sendDefaultEmail(subject, message) {
    sendEmail("adamontheinternet.com@gmail.com", subject, message);
}

function sendEmail(recipient, subject, message) {
    if (test === "true") {
        subject = "(NONPROD) " + subject;
    }
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(sendgridApiKey);
    const msg = {
        to: recipient,
        from: 'adamontheinternet.com@gmail.com',
        subject: subject,
        text: message,
        html: message
    };
    sgMail.send(msg);
}

module.exports = {
    sendDefaultEmail,
    sendEmail
}
