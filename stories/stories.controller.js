const express = require('express');
const storyController = express.Router();
const storyManager = require("./story.manager");

storyController.get('/', (req, res) => {
    const story = storyManager.getRandomStory();
    res.send(story);
});

module.exports = storyController;