const mongoose = require('mongoose');
require('./Muppet.model');
const Muppet = mongoose.model('muppet');
const validator = require('./muppet.validator');

function getAll() {
    return new Promise((resolve, reject) => {
        Muppet.find({})
            .then((all) => {
                resolve(all);
            });
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        Muppet.findOne({
            _id: id
        })
            .then((evidence) => {
                if (evidence) {
                    resolve(evidence);
                } else {
                    reject({
                        message: "Failed to find muppet"
                    });
                }
            });
    });
}

function add(muppet) {
    return new Promise((resolve, reject) => {
        const errors = validator.checkForCreateErrors(muppet);
        if (errors.length > 0) {
            reject(errors);
        }
        else {
            new Muppet({
                name: muppet.name
            })
                .save()
                .then((muppet) => {
                    resolve(muppet);
                });
        }
    });
}

function deleteOne(id) {
    return new Promise((resolve, reject) => {
        Muppet.deleteOne({
            _id: id
        })
            .then(() => {
                resolve({
                    message: `Item with given id deleted or never existed`
                });
            });
    });
}

function edit(muppet) {
    return new Promise((resolve, reject) => {
        const errors = validator.checkForEditErrors(muppet);
        if (errors.length > 0) {
            reject(errors);
        } else {
            const id = muppet._id;
            Muppet.findOne({
                _id: id
            })
                .then((foundItem) => {
                    if (!foundItem) {
                        reject({
                            message: `Failed to find item`
                        });
                    } else {
                        foundItem.name = muppet.name;

                        foundItem.save()
                            .then((response) => {
                                resolve(response);
                            });
                    }
                });
        }
    });
}

module.exports = {
    getAll,
    getById,
    add,
    deleteOne,
    edit,
};
