const mongoose = require('mongoose');
require('./Muppet.model');
const Muppet = mongoose.model('muppet');
const validator = require('./muppet.validator');
const copyUtil = require('../utilities/copy.util');

function getAll() {
    return new Promise((resolve, reject) => {
        Muppet.find({})
            .then((all) => {
                const allReports = all.map(item => getMuppetReport(item));
                resolve(allReports);
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
                notes: muppet.notes,
                quotes: muppet.quotes,
                starQuality: muppet.starQuality,
                cuteness: muppet.cuteness,
                imagination: muppet.imagination,
                storytelling: muppet.storytelling,
                humor: muppet.humor,
                aloofness: muppet.aloofness,
                mischief: muppet.mischief,
                floppiness: muppet.floppiness,
                fuzziness: muppet.fuzziness,
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
                        foundItem.imageLinks = muppet.imageLinks;
                        foundItem.notes = muppet.notes;
                        foundItem.quotes = muppet.quotes;
                        foundItem.starQuality = muppet.starQuality;
                        foundItem.cuteness = muppet.cuteness;
                        foundItem.imagination = muppet.imagination;
                        foundItem.storytelling = muppet.storytelling;
                        foundItem.humor = muppet.humor;
                        foundItem.aloofness = muppet.aloofness;
                        foundItem.mischief = muppet.mischief;
                        foundItem.floppiness = muppet.floppiness;
                        foundItem.fuzziness = muppet.fuzziness;
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
        muppet.cuteness +
        muppet.storytelling +
        muppet.humor +
        muppet.aloofness +
        muppet.mischief +
        muppet.floppiness +
        muppet.fuzziness +
        muppet.softness +
        muppet.imagination;
}
