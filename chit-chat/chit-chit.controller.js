const express = require('express');
const chitChatController = express.Router();
const chitChatManager = require('./chit-chat.manager');

const authUtil = require('../utilities/auth.util');
const mailUtil = require('../utilities/mailer.util');

chitChatController.get('/random', (req, res) => {
    chitChatManager.getRandomChitChat(null)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.get('/random/:previousId', (req, res) => {
    const previousId = req.params.previousId;
    chitChatManager.getRandomChitChat(previousId)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.get('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const id = req.params.id;
    chitChatManager.getChitChatById(id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

chitChatController.get('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
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
            mailUtil.sendDefaultEmail("ChitChat Suggestion", "Question: " + chitChat.question);
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

chitChatController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const chitChat = req.body;
    chitChatManager.editChitChat(chitChat)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

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