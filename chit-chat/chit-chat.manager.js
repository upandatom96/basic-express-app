const mongoose = require('mongoose');
require('./ChitChat.model');
const ChitChat = mongoose.model('chit-chat');

const boolUtil = require('../utilities/bool.util');
const randomUtil = require('../utilities/random.util');

function getRandomChitChat() {
    return new Promise((resolve, reject) => {
        ChitChat
            .find({hidden: false})
            .then((chitChats) => {
                const selectedChat = randomUtil.pickRandom(chitChats);
                resolve(selectedChat);
            });
    });
}

function getChitChatById(id) {
    return new Promise((resolve, reject) => {
        ChitChat.findOne({
            _id: id
        })
            .then((chitChat) => {
                if (chitChat) {
                    resolve(chitChat);
                } else {
                    reject({
                        message: "Failed to find chit chat"
                    });
                }
            });
    });
}

function getAllChitChats() {
    return new Promise((resolve, reject) => {
        ChitChat.find({})
            .then((chitChats) => {
                resolve(chitChats);
            });
    });
}

function addChitChatSuggestion(chitChat) {
    return new Promise((resolve, reject) => {
        if (invalidChitChat(chitChat)) {
            reject("ERR");
        } else {
            new ChitChat({
                question: chitChat.question,
                hidden: true
            })
                .save()
                .then((res) => {
                    resolve(res);
                });
        }
    });
}

function addChitChatUnhidden(chitChat) {
    return new Promise((resolve, reject) => {
        if (invalidChitChat(chitChat)) {
            reject("ERR");
        } else {
            new ChitChat({
                question: chitChat.question,
                hidden: false
            })
                .save()
                .then((res) => {
                    resolve(res);
                });
        }
    });
}

function editChitChat(chitChatUpdate) {
    return new Promise((resolve, reject) => {
        if (invalidChitChat(chitChatUpdate)) {
            reject("ERR");
        } else {
            const id = chitChatUpdate._id;
            ChitChat.findOne({
                _id: id
            })
                .then((foundChitChat) => {
                    if (!foundChitChat) {
                        reject({
                            message: `Failed to find chitChat`
                        });
                    } else {
                        foundChitChat.question = chitChatUpdate.question;
                        foundChitChat.hidden = chitChatUpdate.hidden;

                        foundChitChat.save()
                            .then((response) => {
                                resolve(response);
                            });
                    }
                });
        }
    });
}

function deleteOneChitChat(id) {
    return new Promise((resolve, reject) => {
        ChitChat.deleteOne({
            _id: id
        })
            .then(() => {
                resolve({
                    message: `Issue with given id deleted or never existed`
                });
            });
    });
}

function invalidChitChat(chitChat) {
    return boolUtil.hasNoValue(chitChat) || boolUtil.hasNoValue(chitChat.question);
}

module.exports = {
    getRandomChitChat,
    getAllChitChats,
    getChitChatById,
    addChitChatSuggestion,
    addChitChatUnhidden,
    editChitChat,
    deleteOneChitChat
}
