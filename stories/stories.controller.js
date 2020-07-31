const express = require('express');
const storyController = express.Router();
const storyManager = require("./story.manager");
const tweetManager = require('../tweet/tweet.manager');

storyController.get('/', (req, res) => {
    const story = storyManager.getRandomStory();
    res.send(story);
});

storyController.get('/synonym', (req, res) => {
    storyManager.getRandomSynonymStory()
        .then((story) => {
            res.send(story);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

storyController.get('/super', async (req, res) => {
    try {
        const story = await storyManager.getSuperRandomStory();
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

storyController.get('/rhyme', async (req, res) => {
    try {
        const story = await storyManager.getRandomRhymeStory();
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

storyController.post('/', (req, res) => {
    const story = storyManager.getRandomStory();
    tweetManager.makeStoryTweet(story);
    res.send(story);
});

storyController.post('/synonym', (req, res) => {
    storyManager.getRandomSynonymStory()
        .then((story) => {
            tweetManager.makeStoryTweet(story);
            res.send(story);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

storyController.post('/super', async (req, res) => {
    try {
        const story = await storyManager.getSuperRandomStory();
        tweetManager.makeStoryTweet(story);
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

storyController.post('/rhyme', async (req, res) => {
    try {
        const story = await storyManager.getRandomRhymeStory();
        tweetManager.makeStoryTweet(story);
        res.send(story);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = storyController;
