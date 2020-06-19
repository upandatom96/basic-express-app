const mongoose = require('mongoose');
require('./ClueBot.model');
const ClueBot = mongoose.model('clue-bot');
const clueBotGenerator = require('./clue-bot-generator');
const clueBotProgressor = require('./clue-bot-progressor');

const boolUtil = require('../utilities/bool.util');

function checkMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .find({
                $or: [
                    {status: 0},
                    {status: 1},
                    {status: 2},
                    {status: 3},
                    {status: 4},
                    {status: 5}
                ]
            })
            .then((clueBot) => {
                if (boolUtil.hasValue(clueBot)) {
                    resolve(clueBot);
                } else {
                    resolve("No active mystery");
                }
            });
    });
}

function checkAllMysteries() {
    return new Promise((resolve, reject) => {
        ClueBot
            .find()
            .then((clueBots) => {
                resolve(clueBots);
            });
    });
}

function createNewClueBot(resolve) {
    ClueBot
        .find()
        .then((clueBots) => {
            const clueBotDetails = clueBotGenerator.generateClueBotDetails(clueBots);
            new ClueBot(clueBotDetails)
                .save()
                .then((newClueBot) => {
                    advanceClueBot(newClueBot, resolve);
                });
        });
}

function progressMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .findOne({
                $or: [
                    {status: 0},
                    {status: 1},
                    {status: 2},
                    {status: 3},
                    {status: 4},
                    {status: 5}
                ]
            })
            .then((foundClueBot) => {
                if (boolUtil.hasValue(foundClueBot)) {
                    advanceClueBot(foundClueBot, resolve);
                } else {
                    createNewClueBot(resolve);
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
    checkAllMysteries,
    progressMystery,
    deleteMystery
}

function advanceClueBot(clueBot, resolve) {
    const updatedClueBot = clueBotProgressor.progressClue(clueBot);
    updatedClueBot.save()
        .then((response) => {
            resolve({
                title: response.title,
                _id: response._id
            });
        });
}
