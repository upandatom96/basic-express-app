const mongoose = require('mongoose');
require('./ChitChat.model');
const ChitChat = mongoose.model('chit-chat');

function getAllChitChats() {
    return new Promise((resolve, reject) => {
        ChitChat.find({})
            .then((chitChats) => {
                resolve(chitChats);
            });
    });
}

module.exports = {
    getAllChitChats,
}
