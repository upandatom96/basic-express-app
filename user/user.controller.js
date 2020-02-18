const express = require('express');
const userController = express.Router();
const userManager = require('./user.manager');
const mailer = require('../utilities/mailer.util');
const authUtil = require('../utilities/auth.util');
const boolUtil = require('../utilities/bool.util');

userController.get('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
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

userController.put('/emailUpdate/self', authUtil.jwtAuthenticated, (req, res) => {
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

userController.put('/emailUpdate/admin', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const newEmail = req.body.newEmail;
  const userId = req.body.userId;
  if (
    boolUtil.hasNoValue(userId) || boolUtil.hasNoValue(newEmail)
  ) {
    res.statusCode = 500;
    res.send("Internal error");
  } else {
    userManager.resetEmail(userId, newEmail)
      .then((response) => {
        const recipient = newEmail;
        const subject = "Email Reset (Adam on the Internet)";
        const message = `We have reset your email for adam on the internet.`;
        mailer.sendEmail(recipient, subject, message);
        res.send("Email reset");
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send("internal error");
      });
  }
});

userController.put('/setAdmin', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const isAdmin = req.body.isAdmin;
  const email = req.body.email;
  if (
    boolUtil.hasNoValue(email) || boolUtil.hasNoBoolValue(isAdmin)
  ) {
    res.statusCode = 500;
    res.send("Internal error");
  } else {
    userManager.setToAdmin(email, isAdmin)
      .then((response) => {
        if (isAdmin) {
          const recipient = email;
          const subject = "Welcome to Admin (Adam on the Internet)";
          const message = `You are now an admin on adam on the internet.`;
          mailer.sendEmail(recipient, subject, message);
        }
        res.send("update complete");
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send("internal error");
      });
  }
});

userController.put('/specialAccess', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const specialAccess = req.body.specialAccess;
  const email = req.body.email;
  if (
    boolUtil.hasNoValue(email) || boolUtil.hasNoValue(specialAccess)
  ) {
    res.statusCode = 500;
    res.send("Internal error");
  } else {
    userManager.setSpecialAccess(email, specialAccess)
      .then((response) => {
        res.send("Updated");
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send("internal error");
      });
  }
});

userController.delete('/:id', (req, res) => {
  const id = req.params.id;
  userManager.deleteOneUser(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = userController;