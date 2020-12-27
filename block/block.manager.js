const mongoose = require('mongoose');
require('./Block.model');
const Block = mongoose.model('block');
const blockValidator = require('./block.validator');

const boolUtil = require("../utilities/bool.util");

function getAllBlocks() {
    return new Promise((resolve, reject) => {
        Block.find({})
            .then((blocks) => {
                resolve(blocks);
            });
    });
}

function getBlockById(id) {
    return new Promise((resolve, reject) => {
        Block.findOne({
            _id: id
        })
            .then((block) => {
                if (block) {
                    resolve(block);
                } else {
                    reject({
                        message: "Failed to find block"
                    });
                }
            });
    });
}

function addBlock(block) {
    return new Promise((resolve, reject) => {
        const errors = blockValidator.checkForBlockCreateErrors(block);
        if (errors.length > 0) {
            reject(errors);
        } else {
            if (boolUtil.hasNoValue(block.tags)) {
                block.tags = [];
            }
            new Block({
                title: block.title,
                rule: block.rule,
                creator: block.creator,
                tags: block.tags,
            })
                .save()
                .then((newBlock) => {
                    resolve(newBlock);
                });
        }
    });
}

function editBlock(block) {
    return new Promise((resolve, reject) => {
        const errors = blockValidator.checkForBlockEditErrors(block);
        if (errors.length > 0) {
            reject({
                errors: errors
            });
        } else {
            const id = block._id;
            Block.findOne({
                _id: id
            })
                .then((foundBlock) => {
                    if (!foundBlock) {
                        reject({
                            message: `Failed to find block`
                        });
                    } else {
                        foundBlock.title = block.title;
                        foundBlock.rule = block.rule;
                        foundBlock.tags = block.tags;

                        foundBlock.save()
                            .then((editedBlock) => {
                                resolve(editedBlock);
                            });
                    }
                });
        }
    });
}

function deleteOneBlock(id) {
    return new Promise((resolve, reject) => {
        Block.deleteOne({
            _id: id
        })
            .then(() => {
                resolve({
                    message: `Block with given id deleted or never existed`
                });
            });
    });
}

module.exports = {
    getAllBlocks,
    getBlockById,
    addBlock,
    editBlock,
    deleteOneBlock,
};
