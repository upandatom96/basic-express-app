const Twit = require('twit');
const { twitCredentials } = require("../config/twit.config");
const twitConnection = new Twit(twitCredentials);

let status = "hello, world";

function makeTweet(message) {
  status = message;
  twitConnection.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
  }, afterAuth)
}

function afterAuth(err) {
  if (err) {
    console.log(err);
  } else {
    twitConnection.post('statuses/update', { status: status });
  }
}

module.exports = {
  makeTweet
}
