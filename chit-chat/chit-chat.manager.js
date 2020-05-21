const mongoose = require('mongoose');
require('./ChitChat.model');
const ChitChat = mongoose.model('chit-chat');

const boolUtil = require('../utilities/bool.util');

function getUnhiddenChitChats() {
    return new Promise((resolve, reject) => {
        ChitChat.find({hidden: false})
            .then((chitChats) => {
                resolve(chitChats);
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

function invalidChitChat(chitChat) {
    return boolUtil.hasNoValue(chitChat) || boolUtil.hasNoValue(chitChat.question);
}

module.exports = {
    getAllChitChats,
    getUnhiddenChitChats,
    addChitChatSuggestion,
    addChitChatUnhidden
}
