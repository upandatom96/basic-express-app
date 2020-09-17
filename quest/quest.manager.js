const mongoose = require('mongoose');
require('./Hero.model');
const Hero = mongoose.model('hero');

const heroGenerator = require('./hero-generator');
const nameManager = require('./quest-name.manager');
const heroProgressor = require('./hero-progressor');
const codeRetriever = require('./code-retriever');

const boolUtil = require('../utilities/bool.util');

function getAllHeroes() {
    return new Promise((resolve, reject) => {
        Hero.find({})
            .then((heroes) => {
                const heroReports = getHeroReports(heroes);
                resolve(heroReports);
            });
    });
}

function getFallenHeroes() {
    return new Promise((resolve, reject) => {
        Hero.find({
            status: 99
        })
            .then((heroes) => {
                const heroReports = getHeroReports(heroes);
                resolve(heroReports);
            });
    });
}

function getHeroStats() {
    return new Promise((resolve, reject) => {
        Hero.find({
            status: 99
        })
            .then((heroes) => {
                const heroReports = getHeroReports(heroes);
                resolve({
                    fallenHeroes: heroReports.length
                });
            });
    });
}

function getCurrentHero() {
    return new Promise((resolve, reject) => {
        Hero.find({status: {$ne: 99}})
            .then((livingHeroes) => {
                if (livingHeroes.length > 0) {
                    resolve(livingHeroes[0]);
                } else {
                    resolve("no current hero");
                }
            });
    });
}

function advanceCurrentHero() {
    return new Promise((resolve, reject) => {
        Hero.find({status: {$ne: 99}})
            .then((livingHeroes) => {
                if (livingHeroes.length > 0) {
                    advanceHero(livingHeroes[0], resolve);
                } else {
                    createNewHero(resolve);
                }
            });
    });
}

function deleteHero(id) {
    return new Promise((resolve, reject) => {
        Hero.deleteOne({
            _id: id
        })
            .then(() => {
                resolve({
                    message: `Hero with given id deleted or never existed`
                });
            });
    });
}

function deleteAll() {
    return new Promise((resolve, reject) => {
        Hero.deleteMany({})
            .then(() => {
                resolve({
                    message: `All heroes deleted`
                });
            });
    });
}

module.exports = {
    getAllHeroes,
    getFallenHeroes,
    getHeroStats,
    getCurrentHero,
    deleteHero,
    deleteAll,
    advanceCurrentHero
}

function createNewHero(resolve) {
    nameManager.getRandomHeroName()
        .then((heroName) => {
            Hero
                .find()
                .then((heroes) => {
                    const heroDetails = heroGenerator.generateHero(heroName, heroes);
                    new Hero(heroDetails)
                        .save()
                        .then((newHero) => {
                            advanceHero(newHero, resolve);
                        });
                });
        });
}

function advanceHero(hero, resolve) {
    const updatedHero = heroProgressor.progressHero(hero);
    updatedHero.save()
        .then((savedHero) => {
            const heroReport = getHeroReport(savedHero);
            resolve(heroReport);
        });
}

function getQuestInfo(savedHero) {
    if (boolUtil.hasValue(savedHero.currentQuestCode)) {
        const quest = codeRetriever.findQuest(savedHero.currentQuestCode);
        return {
            name: quest.name,
            distance: `${savedHero.distanceTravelled}/${quest.distanceRequired} miles`,
        };
    } else {
        return null;
    }
}

function getLatestMessage(savedHero) {
    const lastJournalIndex = savedHero.journal.length - 1;
    return savedHero.journal[lastJournalIndex];
}

function getStats(savedHero) {
    return {
        strength: savedHero.strength,
        wisdom: savedHero.wisdom,
        dexterity: savedHero.dexterity,
        charisma: savedHero.charisma,
        ally: savedHero.ally,
        item: savedHero.item,
        ability: savedHero.ability,
        weakness: savedHero.weakness,
    };
}

function getHeroReports(heroDBs) {
    const heroReports = [];
    heroDBs.forEach((heroDB) => {
        const heroReport = getHeroReport(heroDB);
        heroReports.push(heroReport);
    });
    return heroReports;
}

function getHeroReport(heroDB) {
    const announcement = getLatestMessage(heroDB);
    const questInfo = getQuestInfo(heroDB);
    const hpText = `${heroDB.hp}/${heroDB.hpMax} hp`;
    const stats = getStats(heroDB);
    return {
        announcement,
        name: heroDB.name,
        level: heroDB.level,
        hpText: hpText,
        stats,
        questInfo,
        distanceTravelledTotal: heroDB.distanceTravelledTotal,
        storyOver: heroDB.status === 99,
        hp: heroDB.hp,
        hpMax: heroDB.hpMax,
        journal: heroDB.journal
    };
}
