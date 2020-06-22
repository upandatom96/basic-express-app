const mongoose = require('mongoose');
require('./ClueBot.model');
const ClueBot = mongoose.model('clue-bot');
const clueBotGenerator = require('./clue-bot-generator');
const clueBotProgressor = require('./clue-bot-progressor');

const boolUtil = require('../utilities/bool.util');

function checkMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .findOne(
                {solved: false}
            )
            .then((clueBot) => {
                if (boolUtil.hasValue(clueBot)) {
                    resolve({
                        title: clueBot.title,
                        announcements: clueBot.announcements,
                        status: clueBot.status,
                        solved: clueBot.solved,
                        dateStarted: clueBot.date,
                        _id: clueBot._id,
                    });
                } else {
                    resolve(null);
                }
            });
    });
}

function checkAllMysteries() {
    return new Promise((resolve, reject) => {
        ClueBot
            .find(
                {solved: true}
            )
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
            .findOne(
                {solved: false}
            )
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
            const announcement = response.announcements[response.announcements.length - 1];
            resolve({
                title: response.title,
                announcement,
                status: response.status,
                solved: response.solved,
                dateStarted: response.date,
                _id: response._id,
            });
        });
}
