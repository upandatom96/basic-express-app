const passport = require('passport');

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

module.exports = {
  loginUser
}