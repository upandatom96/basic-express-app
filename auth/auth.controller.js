const express = require('express');
const authController = express.Router();
const authManager = require('./auth.manager');
const authUtil = require('../utilities/auth.util');
require('../user/User.model');

authController.post('/login', (req, res, next) => {
  authManager.loginUser(res, req, next);
});

authController.get('/loggedIn', authUtil.jwtAuthenticated, (req, res) => {
  res.send({
    text: `You are logged in.`,
    authorized: true
  });
});

module.exports = authController;
