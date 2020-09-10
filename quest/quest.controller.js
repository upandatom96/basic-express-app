const express = require('express');
const questController = express.Router();
const questManager = require("./quest.manager");
const authUtil = require('../utilities/auth.util');

questController.get('/randomQuestName', (req, res) => {
    questManager.getRandomQuestName()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

questController.get('/randomHeroName', (req, res) => {
    questManager.getRandomHeroName()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = questController;
