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

authController.get('/admin', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  res.send({
    text: `You are logged in as admin.`,
    admin: true,
    authorized: true
  });
});

authController.get('/userDetails', authUtil.jwtAuthenticated, (req, res) => {
  const user = req.userDetails;
  res.send({
    text: `Hello, ${user.email}, you are authenticated.`,
    userId: user._id,
    email: user.email,
    exp: user.exp,
    iat: user.iat,
    authorized: true,
    admin: user.admin,
    specialAccess: user.specialAccess
  });
});

module.exports = authController;
