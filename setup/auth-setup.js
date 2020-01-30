const session = require('express-session');
const { secret } = require('../config/env.config');
const passport = require('passport');

function setupAuth(app) {
  setupSession(app);
  setupPassport(app);
}

function setupSession(app) {
  app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
  }));
}

function setupPassport(app) {
  require('../config/passport.config')(passport);
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = {
  setupAuth
}