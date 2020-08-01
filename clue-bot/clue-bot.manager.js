const mongoose = require('mongoose');
require('./ClueBot.model');
const ClueBot = mongoose.model('clue-bot');
const clueBotGenerator = require('./clue-bot-generator');
const clueBotProgressor = require('./clue-bot-progressor');
const clueStats = require('./clue-stats');

const boolUtil = require('../utilities/bool.util');

function checkMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .findOne(
                {solved: false}
            )
            .then((clueBot) => {
                if (boolUtil.hasValue(clueBot)) {
                    const revealedDetails = {
                        title: clueBot.title,
                        announcements: clueBot.announcements,
                        status: clueBot.status,
                        solved: clueBot.solved,
                        dateStarted: clueBot.dateStarted,
                        _id: clueBot._id,
                    };
                    if (areOptionsRevealed(clueBot.weaponOptions, clueBot.announcements)) {
                        revealedDetails.weaponOptions = clueBot.weaponOptions;
                    }
                    if (areOptionsRevealed(clueBot.sceneOptions, clueBot.announcements)) {
                        revealedDetails.sceneOptions = clueBot.sceneOptions;
                    }
                    if (areOptionsRevealed(clueBot.culpritOptions, clueBot.announcements)) {
                        revealedDetails.culpritOptions = clueBot.culpritOptions;
                    }
                    resolve(revealedDetails);
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
            .sort({dateStarted: -1})
            .then((clueBots) => {
                resolve(clueBots);
            });
    });
}

function checkStats() {
    return new Promise((resolve, reject) => {
        ClueBot
            .find({})
            .then((clueBots) => {
                const stats = clueStats.getStats(clueBots);
                resolve(stats);
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
                    advanceClueBot(newClueBot, resolve, clueBots.length);
                });
        });
}

function progressMystery() {
    return new Promise((resolve, reject) => {
        ClueBot
            .find({})
            .then((allClueBots) => {
                const unsolvedClueBot = allClueBots.find((bot) => {
                    return !bot.solved;
                });
                if (boolUtil.hasValue(unsolvedClueBot)) {
                    const solvedBots = allClueBots.filter((bot) => {
                        return bot.solved;
                    });
                    advanceClueBot(unsolvedClueBot, resolve, solvedBots.length);
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
    checkStats,
    checkMystery,
    checkAllMysteries,
    progressMystery,
    deleteMystery
}

function advanceClueBot(clueBot, resolve, solvedCount) {
    const updatedClueBot = clueBotProgressor.progressClue(clueBot, solvedCount);
    updatedClueBot.save()
        .then((response) => {
            const announcement = response.announcements[response.announcements.length - 1];
            resolve({
                title: response.title,
                announcement,
                status: response.status,
                solved: response.solved,
                dateStarted: response.dateStarted,
                _id: response._id,
            });
        });
}

function areOptionsRevealed(options, announcements) {
    return announcements.some((announcement) => {
        return options.every((option) => {
            return announcement.includes(option);
        });
    });
}
