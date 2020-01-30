const express = require('express');
const passport = require('passport');
const router = express.Router();
const authManager = require('./auth.manager');
require('../user/User.model');

router.post('/login', (req, res, next) => {
  authManager.loginUser(res, req, next);
});

module.exports = router;

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
