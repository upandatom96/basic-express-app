const express = require('express');
const blockController = express.Router();
const blockManager = require('./block.manager');
const authUtil = require('../utilities/auth.util');

blockController.get('/', (req, res) => {
    blockManager.getAllBlocks()
        .then((blocks) => {
            res.send(blocks);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockController.get('/:id', (req, res) => {
    const id = req.params.id;
    blockManager.getBlockById(id)
        .then((block) => {
            res.send(block);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const block = req.body;
    block.creator = req.userDetails._id;
    blockManager.addBlock(block)
        .then((addedBlock) => {
            res.send(addedBlock);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const id = req.params.id;
    blockManager.deleteOneBlock(id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

blockController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
    const block = req.body;
    blockManager.editBlock(block)
        .then((editedBlock) => {
            res.send(editedBlock);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = blockController;
