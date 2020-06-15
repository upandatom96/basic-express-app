const { twitConsumerKey, twitConsumerSecret, twitAccessToken, twitAccessTokenSecret } = require('../config/env.config');

const aotiCredentials = {
  consumer_key: twitConsumerKey,
  consumer_secret: twitConsumerSecret,
  access_token: twitAccessToken,
  access_token_secret: twitAccessTokenSecret
};

module.exports = {
  aotiCredentials
};