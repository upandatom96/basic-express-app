const express = require('express');
const questController = express.Router();
const questManager = require("./quest.manager");
const authUtil = require('../utilities/auth.util');

questController.get('/randomQuestName', async (req, res) => {
    try {
        const name = await questManager.getRandomQuestName();
        res.send(name);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/randomHeroName', async (req, res) => {
    try {
        const name = await questManager.getRandomHeroName();
        res.send(name);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = questController;
