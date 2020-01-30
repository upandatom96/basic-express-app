const express = require('express');
const passport = require('passport');
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

function loginUser(res, req, next) {
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    }
    else {
      res.status(401).json(info);
    }
  })(req, res, next);
}
