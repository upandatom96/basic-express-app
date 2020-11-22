const express = require('express');
const characterController = express.Router();
const characterManager = require('./character.manager');

characterController.get('/random', async (req, res) => {
    try {
        const character = await characterManager.getRandomCharacter();
        res.send(character);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = characterController;
