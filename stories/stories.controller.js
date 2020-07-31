const express = require('express');
const storyController = express.Router();
const storyManager = require("./story.manager");
const tweetManager = require('../tweet/tweet.manager');

storyController.get('/random', async (req, res) => {
    try {
        const story = await storyManager.getRandomStory();
        tweetStory(req.query.tweet, story);
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

storyController.get('/synonym', async (req, res) => {
    try {
        const story = await storyManager.getRandomSynonymStory();
        tweetStory(req.query.tweet, story);
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

storyController.get('/super', async (req, res) => {
    try {
        const story = await storyManager.getSuperRandomStory();
        tweetStory(req.query.tweet, story);
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

storyController.get('/rhyme', async (req, res) => {
    try {
        const story = await storyManager.getRandomRhymeStory();
        tweetStory(req.query.tweet, story);
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = storyController;

function tweetStory(tweetParam, story) {
    if (tweetParam && tweetParam.toUpperCase() === "TRUE") {
        tweetManager.makeStoryTweet(story);
    }
}
