const express = require('express');
const chitChatController = express.Router();
const chitChatManager = require('./chit-chat.manager');

const authUtil = require('../utilities/auth.util');

// TODO get one randomly

chitChatController.get('/', (req, res) => {
    chitChatManager.getUnhiddenChitChats()
        .then((doodads) => {
            res.send(doodads);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.get('/all', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    chitChatManager.getAllChitChats()
        .then((doodads) => {
            res.send(doodads);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.post('/', (req, res) => {
    const chitChat = req.body;
    chitChatManager.addChitChatSuggestion(chitChat)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.post('/unhidden', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const chitChat = req.body;
    chitChatManager.addChitChatUnhidden(chitChat)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

// TODO hide chit chat
// TODO show chit chat
// TODO delete chit chat

module.exports = chitChatController;