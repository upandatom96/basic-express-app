const {
  twitConsumerKey,
  twitConsumerSecret,
  twitAccessToken,
  twitAccessTokenSecret,
  storyConsumerKey,
  storyConsumerSecret,
  storyAccessToken,
  storyAccessTokenSecret,
  orderConsumerKey,
  orderConsumerSecret,
  orderAccessToken,
  orderAccessTokenSecret
} = require('../config/env.config');

const aotiCredentials = {
  consumer_key: twitConsumerKey,
  consumer_secret: twitConsumerSecret,
  access_token: twitAccessToken,
  access_token_secret: twitAccessTokenSecret
};

const storyCredentials = {
  consumer_key: storyConsumerKey,
  consumer_secret: storyConsumerSecret,
  access_token: storyAccessToken,
  access_token_secret: storyAccessTokenSecret
};

const orderCredentials = {
  consumer_key: orderConsumerKey,
  consumer_secret: orderConsumerSecret,
  access_token: orderAccessToken,
  access_token_secret: orderAccessTokenSecret
};

module.exports = {
  aotiCredentials,
  storyCredentials,
  orderCredentials
};