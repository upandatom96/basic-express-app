const mongoose = require('mongoose');
require('./ClueBot.model');
const ClueBot = mongoose.model('clue-bot');

function checkMystery() {
    return new Promise((resolve, reject) => {
        resolve("Its a mystery");
    });
}

function progressMystery() {
    return new Promise((resolve, reject) => {
        resolve("Progressing the mystery");
    });
}

module.exports = {
    checkMystery,
    progressMystery
}
