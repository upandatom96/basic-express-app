const { twitConsumerKey, twitConsumerSecret, twitAccessToken, twitAccessTokenSecret } = require('../config/env.config');
const twitCredentials = {
  consumer_key: twitConsumerKey,
  consumer_secret: twitConsumerSecret,
  access_token: twitAccessToken,
  access_token_secret: twitAccessTokenSecret
};

module.exports = {
  twitCredentials: twitCredentials
};