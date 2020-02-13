const express = require('express');
const userController = express.Router();
const userManager = require('./user.manager');
const mailer = require('../utilities/mailer.util');
const authUtil = require('../utilities/auth.util');
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

userController.put('/passwordReset/automatic', (req, res) => {
  const email = req.body.email;
  if (boolUtil.hasNoValue(email)) {
    res.statusCode = 500;
    res.send("No email given.");
  } else {
    userManager.resetPasswordAutomatic(email)
      .then((response) => {
        console.log("new password: " + response.newPassword);
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

userController.put('/passwordReset/manual', authUtil.jwtAuthenticated, (req, res) => {
  const email = req.userDetails.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (
    boolUtil.hasNoValue(password) || boolUtil.hasNoValue(confirmPassword) ||
    boolUtil.hasNoValue(email)
  ) {
    res.statusCode = 500;
    res.send("Internal error");
  } else {
    userManager.resetPasswordManual(email, password, confirmPassword)
      .then((response) => {
        const recipient = email;
        const subject = "Password Reset (Adam on the Internet)";
        const message = `You have reset your password for adam on the internet.`;
        mailer.sendEmail(recipient, subject, message);
        res.send("Password reset");
      })
      .catch((err) => {
        const recipient = email;
        const subject = "Password Reset Attempted (Adam on the Internet)";
        const message = `Unable to reset password for adam on the internet. Are you sure this email address is registered?`;
        mailer.sendEmail(recipient, subject, message);
        res.statusCode = 500;
        res.send(err);
      });
  }
});

userController.put('/emailUpdate', authUtil.jwtAuthenticated, (req, res) => {
  const user = req.userDetails
  const newEmail = req.body.newEmail;
  if (
    boolUtil.hasNoValue(user) || boolUtil.hasNoValue(newEmail)
  ) {
    res.statusCode = 500;
    res.send("Internal error");
  } else {
    userManager.resetEmail(user._id, newEmail)
      .then((response) => {
        const recipient = newEmail;
        const subject = "Email Reset (Adam on the Internet)";
        const message = `You have reset your email for adam on the internet.`;
        mailer.sendEmail(recipient, subject, message);
        res.send("Email reset");
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send("internal error");
      });
  }
});

// change to admin

// set special access

module.exports = userController;