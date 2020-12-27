const mongoose = require('mongoose');
require('./BlockDeck.model');
const BlockDeck = mongoose.model('blockdeck');
const blockDeckValidator = require('./blockDeck.validator');

const boolUtil = require("../utilities/bool.util");

function getAllBlockDecks() {
    return new Promise((resolve, reject) => {
        BlockDeck.find({})
            .populate('blocks')
            .then((blockDecks) => {
                resolve(blockDecks);
            });
    });
}

function getBlockDeckById(id) {
    return new Promise((resolve, reject) => {
        BlockDeck.findOne({
            _id: id
        })
            .populate('blocks')
            .then((blockDeck) => {
                if (blockDeck) {
                    resolve(blockDeck);
                } else {
                    reject({
                        message: "Failed to find block deck"
                    });
                }
            });
    });
}

function addBlockDeck(blockDeck) {
    return new Promise((resolve, reject) => {
        const errors = blockDeckValidator.checkForBlockDeckCreateErrors(blockDeck);
        if (errors.length > 0) {
            reject(errors);
        } else {
            if (boolUtil.hasNoValue(blockDeck.tags)) {
                blockDeck.tags = [];
            }
            if (boolUtil.hasNoValue(blockDeck.blocks)) {
                blockDeck.blocks = [];
            }
            new BlockDeck({
                title: blockDeck.title,
                description: blockDeck.description,
                type: blockDeck.type,
                creator: blockDeck.creator,
                tags: blockDeck.tags,
                blocks: blockDeck.blocks,
            })
                .save()
                .then((newBlockDeck) => {
                    resolve(newBlockDeck);
                });
        }
    });
}

function editBlockDeck(blockDeck) {
    return new Promise((resolve, reject) => {
        const errors = blockDeckValidator.checkForBlockDeckEditErrors(blockDeck);
        if (errors.length > 0) {
            reject({
                errors: errors
            });
        } else {
            const id = blockDeck._id;
            BlockDeck.findOne({
                _id: id
            })
                .then((foundBlockDeck) => {
                    if (!foundBlockDeck) {
                        reject({
                            message: `Failed to find block deck`
                        });
                    } else {
                        foundBlockDeck.title = blockDeck.title;
                        foundBlockDeck.description = blockDeck.description;
                        foundBlockDeck.type = blockDeck.type;
                        foundBlockDeck.tags = blockDeck.tags;
                        foundBlockDeck.blocks = blockDeck.blocks;

                        foundBlockDeck.save()
                            .then((editedBlockDeck) => {
                                resolve(editedBlockDeck);
                            });
                    }
                });
        }
    });
}

function deleteOneBlockDeck(id) {
    return new Promise((resolve, reject) => {
        BlockDeck.deleteOne({
            _id: id
        })
            .then(() => {
                resolve({
                    message: `Block Deck with given id deleted or never existed`
                });
            });
    });
}

module.exports = {
    getAllBlockDecks,
    getBlockDeckById,
    addBlockDeck,
    editBlockDeck,
    deleteOneBlockDeck,
};
