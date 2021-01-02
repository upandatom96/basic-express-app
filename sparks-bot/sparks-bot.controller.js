const express = require('express');
const controller = express.Router();
const sparksBotManager = require("./sparks-bot.manager");
const tweetManager = require("../tweet/tweet.manager");

controller.get('', async (req, res) => {
    try {
        const lyrics = sparksBotManager.getRandomSparksLyrics();
        tweetSparks(req.query.tweet, lyrics.message);
        res.send(lyrics);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = controller;

function tweetSparks(tweetParam, message) {
    if (tweetParam && tweetParam.toUpperCase() === "TRUE") {
        tweetManager.makeSparksTweet(message);
    }
}
