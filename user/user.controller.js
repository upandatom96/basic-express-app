const express = require('express');
const userController = express.Router();
const userManager = require('./user.manager');
const mailer = require('../utilities/mailer.util');
const boolUtil = require('../utilities/bool.util');

userController.get('/', (req, res) => {
  userManager.getAllUsers()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

userController.post('/register', (req, res) => {
  const user = req.body;
  userManager.registerUser(user)
    .then((registrationResponse) => {
      const recipient = user.email;
      const subject = "Welcome to Callanan Concepts";
      const message = `Your temporary password is ${registrationResponse.newPassword}. Login to change it.`;
      mailer.sendEmail(recipient, subject, message);
      res.send("Registered " + user.email);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

userController.put('/passwordReset/random', (req, res) => {
  const email = req.body.email;
  if (boolUtil.hasNoValue(email)) {
    res.statusCode = 500;
    res.send("No email given.");
  } else {
    userManager.resetPassword(email)
      .then((response) => {
        const recipient = email;
        const subject = "Password Reset";
        const message = `Your new password is ${response.newPassword}`;
        mailer.sendEmail(recipient, subject, message);
        res.send("Password reset");
      })
      .catch((err) => {
        const recipient = email;
        const subject = "Password Reset Attempted";
        const message = `Unable to reset password for callanan concepts. Are you sure this email address is registered?`;
        mailer.sendEmail(recipient, subject, message);
        res.statusCode = 500;
        res.send(err);
      });
  }
});

module.exports = userController;