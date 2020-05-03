const Twit = require('twit');
const { twitCredentials } = require("../config/twit.config");
const twitConnection = new Twit(twitCredentials);

function makeTweet(message) {
  twitConnection.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
  }, afterAuth(message))
}

function afterAuth(message) {
  twitConnection.post('statuses/update', { status: message });
}

module.exports = {
  makeTweet
}
