const Twit = require('twit');
const {test} = require("../config/env.config");
const {
    aotiCredentials,
    storyCredentials,
    orderCredentials
} = require("../config/twit.config");

let twitConnection;

function makeStoryTweet(message) {
    makeTweet(message, storyCredentials);
}

function makeAotiTweet(message) {
    makeTweet(message, aotiCredentials);
}

function makeOrderTweet(message) {
    makeTweet(message, orderCredentials);
}

module.exports = {
    makeAotiTweet,
    makeStoryTweet,
    makeOrderTweet
}

function makeTweet(message, twitterCredentials) {
    console.log("TWEET: " + message);
    if (test === "true") {
        return;
    }
    twitConnection = new Twit(twitterCredentials);
    twitConnection.get('account/verify_credentials', {
        include_entities: false,
        skip_status: true,
        include_email: false
    }, tweetAfterAuth(message))
}

function tweetAfterAuth(message) {
    twitConnection.post('statuses/update', {status: message});
}
