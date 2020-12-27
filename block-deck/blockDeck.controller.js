const express = require('express');
const blockDeckController = express.Router();
const blockDeckManager = require('./blockDeck.manager');
const authUtil = require('../utilities/auth.util');

blockDeckController.get('/', (req, res) => {
    blockDeckManager.getAllBlockDecks()
        .then((blockDecks) => {
            res.send(blockDecks);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockDeckController.get('/:id', (req, res) => {
    const id = req.params.id;
    blockDeckManager.getBlockDeckById(id)
        .then((block) => {
            res.send(block);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockDeckController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const blockDeck = req.body;
    blockDeck.creator = req.userDetails._id;
    blockDeckManager.addBlockDeck(blockDeck)
        .then((addedBlockDeck) => {
            res.send(addedBlockDeck);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockDeckController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const id = req.params.id;
    blockDeckManager.deleteOneBlockDeck(id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockDeckController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const blockDeck = req.body;
    blockDeckManager.editBlockDeck(blockDeck)
        .then((editedBlockDeck) => {
            res.send(editedBlockDeck);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = blockDeckController;
