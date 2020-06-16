const express = require('express');
const storyController = express.Router();
const storyManager = require("./story.manager");
const tweetManager = require('../tweet/tweet.manager');

storyController.get('/', (req, res) => {
    const story = storyManager.getRandomStory();
    res.send(story);
});

storyController.post('/', (req, res) => {
    const story = storyManager.getRandomStory();
    tweetManager.makeStoryTweet(story);
    res.send(story);
});

module.exports = storyController;