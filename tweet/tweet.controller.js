const express = require('express');
const tweetController = express.Router();
const tweetManager = require('./tweet.manager.js');
const authUtil = require('../utilities/auth.util');
const {aotiCredentials} = require("../config/twit.config");

tweetController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const message = req.body.message;
  if (message) {
    tweetManager.makeTweet(message, aotiCredentials);
    res.send({ message: `tweeting message: ${message}` });
  } else {
    res.statusCode = 500;
    res.send("ERR");
  }
});

module.exports = tweetController;