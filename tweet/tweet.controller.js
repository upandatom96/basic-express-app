const express = require('express');
const tweetController = express.Router();
const tweetManager = require('./tweet.manager.js');
const authUtil = require('../utilities/auth.util');

tweetController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const message = req.body.message;
  tweetManager.makeTweet(message);
  res.send({ message: "tweeting..." });
});

module.exports = tweetController;