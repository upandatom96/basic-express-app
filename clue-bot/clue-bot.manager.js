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
                    {status: 4}
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

function progressMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .findOne({
                $or: [
                    {status: 0},
                    {status: 1},
                    {status: 2},
                    {status: 3},
                    {status: 4}
                ]
            })
            .then((foundClueBot) => {
                if (boolUtil.hasValue(foundClueBot)) {
                    const updatedClueBot = clueBotProgressor.progressClue(foundClueBot);
                    updatedClueBot.save()
                        .then((response) => {
                            resolve({
                                title: response.title,
                                _id: response._id
                            });
                        });
                } else {
                    const clueBotDetails = clueBotGenerator.generateClueBotDetails();
                    new ClueBot(clueBotDetails)
                        .save()
                        .then((newClueBot) => {
                            const updatedClueBot = clueBotProgressor.progressClue(newClueBot);
                            updatedClueBot.save()
                                .then((response) => {
                                    resolve({
                                        title: response.title,
                                        _id: response._id
                                    });
                                });
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
    checkAllMysteries,
    progressMystery,
    deleteMystery
}
