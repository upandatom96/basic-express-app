const express = require('express');
const wordController = express.Router();
const wordManager = require("./word.manager");

wordController.get('/synonym/:word', (req, res) => {
    const word = req.params.word;
    wordManager.getSynonym(word)
        .then((selectedWord) => {
            res.send(selectedWord);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = wordController;