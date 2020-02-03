var jwt = require('express-jwt');
const { secret } = require('../config/env.config');

module.exports = {
  jwtSecret: secret,
  jwtAuthenticated: jwt({
    secret: secret,
    userProperty: 'userDetails'
  }),
  jwtAdmin: ((req, res, next) => {
    const user = req.userDetails;
    if (!user.admin) {
      res.send({
        text: `Unauthorized for admin.`,
        admin: false,
        authorized: true
      });
    } else {
      next();
    }
  }),
  jwtIdentity: ((req, res, next) => {
    const tokenUser = req.userDetails._id;
    const requestedUser = req.body._id;
    if (!requestedUser) {
      res.send(`No user selected.`);
    } else if (tokenUser !== requestedUser) {
      res.send(`Unauthorized for this user.`);
    } else {
      next();
    }
  }),
}
