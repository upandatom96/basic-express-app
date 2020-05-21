const express = require('express');
const chitChatController = express.Router();
const chitChatManager = require('./chit-chat.manager');

chitChatController.get('/', (req, res) => {
    chitChatManager.getAllChitChats()
        .then((doodads) => {
            res.send(doodads);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = chitChatController;