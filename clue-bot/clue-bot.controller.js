const express = require('express');
const clueBotController = express.Router();
const clueBotManager = require('./clue-bot.manager');

clueBotController.get('/', (req, res) => {
    clueBotManager.checkMystery()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

clueBotController.post('/', (req, res) => {
    clueBotManager.progressMystery()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = clueBotController;