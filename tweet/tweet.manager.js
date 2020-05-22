const Twit = require('twit');
const {test} = require("../config/env.config");
const {twitCredentials} = require("../config/twit.config");

let twitConnection;

function makeTweet(message) {
    if (test === "true") {
        return;
    }
    twitConnection = new Twit(twitCredentials);
    twitConnection.get('account/verify_credentials', {
        include_entities: false,
        skip_status: true,
        include_email: false
    }, tweetAfterAuth(message))
}

module.exports = {
    makeTweet
}

function tweetAfterAuth(message) {
    twitConnection.post('statuses/update', {status: message});
}
