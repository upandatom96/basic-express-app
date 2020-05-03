const Twit = require('twit');
const { twitConsumerKey, twitConsumerSecret, twitAccessToken, twitAccessTokenSecret } = require('../config/env.config');
const twitConnection = new Twit({
  consumer_key: twitConsumerKey,
  consumer_secret: twitConsumerSecret,
  access_token: twitAccessToken,
  access_token_secret: twitAccessTokenSecret
});

function makeTweet(tweet) {
  twitConnection.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
  }, onAuthenticated)

  return new Promise((resolve, reject) => {
    resolve("attempting to tweet");
  });
}

function onAuthenticated(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Authentication successful.')
    twitConnection.post('statuses/update', { status: 'hello world' })
  }
}

module.exports = {
  makeTweet
}
