const express = require('express');
const characterController = express.Router();
const characterManager = require('./character.manager');

characterController.get('', async (req, res) => {
    try {
        const character = await characterManager.getGenericCharacter();
        res.send(character);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

characterController.get('/questBotEnemy', async (req, res) => {
    try {
        const character = await characterManager.getQuestBotEnemy();
        res.send(character);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

characterController.get('/npc', async (req, res) => {
    try {
        const character = await characterManager.getNpc();
        res.send(character);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

characterController.get('/pc', async (req, res) => {
    try {
        const character = await characterManager.getPc();
        res.send(character);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = characterController;
