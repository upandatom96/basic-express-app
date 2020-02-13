var jwt = require('express-jwt');
const { secret } = require('../config/env.config');
const boolUtil = require('../utilities/bool.util');

module.exports = {
  jwtSecret: secret,
  jwtAuthenticated: jwt({
    secret: secret,
    userProperty: 'userDetails'
  }),
  jwtAdmin: ((req, res, next) => {
    const user = req.userDetails;
    if (boolUtil.hasNoValue(user)) {
      res.send("User invalid.");
    } else if (!user.admin) {
      res.send(`Unauthorized for admin.`);
    } else {
      next();
    }
  }),
  jwtIdentity: ((req, res, next) => {
    const tokenUser = req.userDetails._id;
    const requestedUser = req.body._id;
    if (boolUtil.hasNoValue(requestedUser)) {
      res.send(`No user selected.`);
    } else if (tokenUser !== requestedUser) {
      res.send(`Unauthorized for this user.`);
    } else {
      next();
    }
  }),
}
