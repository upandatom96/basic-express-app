const {
  twitConsumerKey,
  twitConsumerSecret,
  twitAccessToken,
  twitAccessTokenSecret,
  storyConsumerKey,
  storyConsumerSecret,
  storyAccessToken,
  storyAccessTokenSecret,
  clueConsumerKey,
  clueConsumerSecret,
  clueAccessToken,
  clueAccessTokenSecret,
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

const clueCredentials = {
  consumer_key: clueConsumerKey,
  consumer_secret: clueConsumerSecret,
  access_token: clueAccessToken,
  access_token_secret: clueAccessTokenSecret
};

module.exports = {
  aotiCredentials,
  storyCredentials,
  clueCredentials,
  orderCredentials
};