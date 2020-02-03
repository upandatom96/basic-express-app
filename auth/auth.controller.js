const express = require('express');
const authController = express.Router();
const authManager = require('./auth.manager');
const authUtil = require('../utilities/auth.util');
require('../user/User.model');

authController.post('/login', (req, res, next) => {
  authManager.loginUser(res, req, next);
});

authController.get('/checkLogin', authUtil.jwtAuthenticated, (req, res) => {
  res.send(
    `You are logged in.`,
  );
});

authController.get('/admin', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  res.send(
    `You are logged in as admin.`,
  );
});

authController.get('/details', authUtil.jwtAuthenticated, (req, res) => {
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

authController.get('/identity', authUtil.jwtAuthenticated, authUtil.jwtIdentity, (req, res) => {
  const requestedId = req.body._id;
  res.send(
    `You have access to user with id ${requestedId}.`
  );
});

module.exports = authController;
