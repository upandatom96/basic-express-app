const express = require('express');
const chitChatController = express.Router();
const chitChatManager = require('./chit-chat.manager');

const authUtil = require('../utilities/auth.util');

chitChatController.get('/random', (req, res) => {
    chitChatManager.getRandomChitChat()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.get('/', (req, res) => {
    chitChatManager.getUnhiddenChitChats()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.get('/all', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    chitChatManager.getAllChitChats()
        .then((response) => {
            res.send(response);
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

// TODO put hide chit chat
// TODO put show chit chat
// TODO put edit chit chat

chitChatController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const id = req.params.id;
    chitChatManager.deleteOneChitChat(id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

// TODO delete chit chat

module.exports = chitChatController;