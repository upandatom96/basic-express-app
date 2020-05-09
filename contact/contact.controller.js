const express = require('express');
const contactController = express.Router();
const mailer = require('../utilities/mailer.util');
const boolUtil = require('../utilities/bool.util');

contactController.post('/', (req, res) => {
  // read json body
  const emailOrder = req.body;

  if (
    boolUtil.hasNoValue(emailOrder) || boolUtil.hasNoValue(emailOrder.message) ||
    boolUtil.hasNoValue(emailOrder.sender)
  ) {
    res.statusCode = 500;
    res.send("Internal error");
  } else {
    // setup email
    const recipient = "adamontheinternet.com@gmail.com";
    const sender = emailOrder.sender;

    let subject;
    if (emailOrder.subject) {
        subject = `AOTI: ${emailOrder.subject}`;
    } else {
        subject = `AOTI: Contacted`;
    }

    const d = new Date();
    const date = d.getTime() + " on day " + d.getDate() + " of month " + (d.getMonth() + 1) + ", " + d.getFullYear();
    const message = `<p>FROM: ${sender}</p><p>ON: ${date}</p><p>MESSAGE: ${emailOrder.message}</p>`;

    // send
    mailer.sendEmail(recipient, subject, message);
    res.send({ message: "Email sent!" });
  }
});

module.exports = contactController;