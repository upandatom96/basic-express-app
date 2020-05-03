const express = require('express');
const tweetController = express.Router();
const tweetManager = require('./tweet.manager.js');
const authUtil = require('../utilities/auth.util');

tweetController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const tweet = req.body;
  tweetManager.makeTweet(tweet)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = tweetController;