const express = require('express');
const tweetController = express.Router();
const authUtil = require('../utilities/auth.util');

tweetController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  res.send("tweet");
  // const spectreCard = req.body;
  // addSpectreCard(spectreCard)
  //   .then((addedSpectreCard) => {
  //     res.send(addedSpectreCard);
  //   })
  //   .catch((err) => {
  //     res.statusCode = 500;
  //     res.send(err);
  //   });
});

module.exports = tweetController;