const mongoose = require('mongoose');
require('./Muppet.model');
const Muppet = mongoose.model('muppet');
const validator = require('./muppet.validator');
const copyUtil = require('../utilities/copy.util');
const randomUtil = require('../utilities/random.util');

function getAll() {
    return new Promise((resolve, reject) => {
        Muppet.find({})
            .then((all) => {
                const allReports = all.map(item => getMuppetReport(item));
                resolve(allReports);
            });
    });
}

function getStats() {
    return new Promise((resolve, reject) => {
        Muppet.find({})
            .then((all) => {
                const stats = calculateStats(all);
                resolve(stats);
            });
    });
}

function getRandom() {
    return new Promise((resolve, reject) => {
        Muppet.find({})
            .then((all) => {
                const picked = randomUtil.pickRandom(all);
                resolve(picked);
            });
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        Muppet.findOne({
            _id: id
        })
            .then((item) => {
                if (item) {
                    const muppetReport = getMuppetReport(item);
                    resolve(muppetReport);
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
        } else {
            new Muppet({
                name: muppet.name,
                debutYear: muppet.debutYear,
                commonality: muppet.commonality,
                speechType: muppet.speechType,
                mainSeries: muppet.mainSeries,
                creature: muppet.creature,
                appearanceAdjectives: muppet.appearanceAdjectives,
                attitudeAdjectives: muppet.attitudeAdjectives,
                tags: muppet.tags,
                notes: muppet.notes,
                quotes: muppet.quotes,
                starQuality: muppet.starQuality,
                friendliness: muppet.friendliness,
                imagination: muppet.imagination,
                showmanship: muppet.showmanship,
                humor: muppet.humor,
                absentmindedness: muppet.absentmindedness,
                mischief: muppet.mischief,
                floppiness: muppet.floppiness,
                passion: muppet.passion,
                softness: muppet.softness,
                strength: muppet.strength,
                wisdom: muppet.wisdom,
                intelligence: muppet.intelligence,
                constitution: muppet.constitution,
                charisma: muppet.charisma,
                dexterity: muppet.dexterity,
                muppetRank: muppet.muppetRank,
                alignment: muppet.alignment,
                archived: muppet.archived,
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
                        foundItem.debutYear = muppet.debutYear;
                        foundItem.commonality = muppet.commonality;
                        foundItem.speechType = muppet.speechType;
                        foundItem.mainSeries = muppet.mainSeries;
                        foundItem.creature = muppet.creature;
                        foundItem.appearanceAdjectives = muppet.appearanceAdjectives;
                        foundItem.attitudeAdjectives = muppet.attitudeAdjectives;
                        foundItem.tags = muppet.tags;
                        foundItem.imageLinks = muppet.imageLinks;
                        foundItem.notes = muppet.notes;
                        foundItem.quotes = muppet.quotes;
                        foundItem.starQuality = muppet.starQuality;
                        foundItem.friendliness = muppet.friendliness;
                        foundItem.imagination = muppet.imagination;
                        foundItem.showmanship = muppet.showmanship;
                        foundItem.humor = muppet.humor;
                        foundItem.absentmindedness = muppet.absentmindedness;
                        foundItem.mischief = muppet.mischief;
                        foundItem.floppiness = muppet.floppiness;
                        foundItem.passion = muppet.passion;
                        foundItem.softness = muppet.softness;
                        foundItem.strength = muppet.strength;
                        foundItem.wisdom = muppet.wisdom;
                        foundItem.intelligence = muppet.intelligence;
                        foundItem.constitution = muppet.constitution;
                        foundItem.charisma = muppet.charisma;
                        foundItem.dexterity = muppet.dexterity;
                        foundItem.muppetRank = muppet.muppetRank;
                        foundItem.alignment = muppet.alignment;
                        foundItem.archived = muppet.archived;

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
    getRandom,
    getStats,
    add,
    deleteOne,
    edit,
};

function getMuppetReport(muppet) {
    const muppetReport = copyUtil.copy(muppet);
    muppetReport.muppetPowerLevel = getMuppetPowerLevel(muppet);
    return muppetReport;
}

function getMuppetPowerLevel(muppet) {
    return muppet.starQuality +
        muppet.friendliness +
        muppet.showmanship +
        muppet.humor +
        muppet.absentmindedness +
        muppet.mischief +
        muppet.floppiness +
        muppet.passion +
        muppet.softness +
        muppet.imagination;
}

function calculateStats(all) {
    return {
        muppetCount: all.length
    };
}
