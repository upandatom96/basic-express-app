const Twit = require('twit');
const { twitCredentials } = require("../config/twit.config");
const twitConnection = new Twit(twitCredentials);

function makeTweet(message) {
  console.log(message);
  twitConnection.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
  }, afterAuth)
}

function afterAuth(err) {
  if (err) {
    console.log(err)
  } else {
    twitConnection.post('statuses/update', { status: 'hello world' })
  }
}

module.exports = {
  makeTweet
}
