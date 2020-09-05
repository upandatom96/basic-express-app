const express = require('express');
const clueBotController = express.Router();
const clueBotManager = require('./clue-bot.manager');

clueBotController.get('/current', (req, res) => {
    clueBotManager.checkMystery()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

clueBotController.get('/stats', (req, res) => {
    clueBotManager.checkStats()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

clueBotController.get('/statMessage', (req, res) => {
    clueBotManager.getStatMessage()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

clueBotController.get('/', (req, res) => {
    clueBotManager.checkAllMysteries()
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

clueBotController.delete('/:id', (req, res) => {
    const id = req.params.id;
    clueBotManager.deleteMystery(id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = clueBotController;
