const mongoose = require('mongoose');
require('./ClueBot.model');
const ClueBot = mongoose.model('clue-bot');
const clueBotGenerator = require('./clue-bot-generator');

const boolUtil = require('../utilities/bool.util');

function checkMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .findOne({concluded: false})
            .then((clueBot) => {
                if (boolUtil.hasValue(clueBot)) {
                    resolve(clueBot);
                } else {
                    resolve("No active mystery");
                }
            });
    });
}

function progressMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .findOne({concluded: false})
            .then((clueBot) => {
                if (boolUtil.hasValue(clueBot)) {
                    resolve(clueBot);
                } else {
                    const clueBotDetails = clueBotGenerator.generateClueBotDetails();
                    new ClueBot(clueBotDetails)
                        .save()
                        .then((res) => {
                            resolve(res);
                        });
                }
            });
    });
}

function deleteMystery(id) {
    return new Promise((resolve, reject) => {
        ClueBot.deleteOne({
            _id: id
        })
            .then(() => {
                resolve({
                    message: `ClueBot with given id deleted or never existed`
                });
            });
    });
}

module.exports = {
    checkMystery,
    progressMystery,
    deleteMystery
}
