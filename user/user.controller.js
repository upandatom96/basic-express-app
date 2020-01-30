const express = require('express');
const userController = express.Router();
const userManager = require('./user.manager');
const mailer = require('../utilities/mailer.util');

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

module.exports = userController;