const mongoose = require('mongoose');
require('./Hero.model');
const Hero = mongoose.model('hero');

const heroGenerator = require('./hero-generator');
const nameManager = require('./quest-name.manager');
const heroProgressor = require('./hero-progressor');
const codeRetriever = require('./code-retriever');

const boolUtil = require('../utilities/bool.util');
const calcUtil = require('../utilities/calc.util');

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
                    const currentHero = livingHeroes[0];
                    const currentHeroReport = getHeroReport(currentHero);
                    resolve(currentHeroReport);
                } else {
                    resolve(null);
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
            title: quest.title,
            flavorText: `
            They must travel ${quest.distanceRequired} miles and ${quest.text}. 
            So far, they have travelled ${savedHero.distanceTravelled} miles.
            `,
        };
    } else {
        return null;
    }
}

function getChapterInfo(savedHero) {
    if (boolUtil.hasValue(savedHero.currentChapterCode)) {
        const chapterEvent = codeRetriever.findChapterEvent(savedHero.currentChapterCode);
        return {
            title: "title TBD",
            flavorText: `
            ${chapterEvent.intro}
            `,
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
    const specialRevealed = savedHero.status > 3;
    const baseStatsRevealed = savedHero.status > 2;
    return {
        // base stats
        strength: baseStatsRevealed ? savedHero.strength : "???",
        wisdom: baseStatsRevealed ? savedHero.wisdom : "???",
        dexterity: baseStatsRevealed ? savedHero.dexterity : "???",
        charisma: baseStatsRevealed ? savedHero.charisma : "???",
        // special stats
        ability: specialRevealed ? savedHero.ability : "???",
        weakness: specialRevealed ? savedHero.weakness : "???",
        // holding stats
        ally: savedHero.ally,
        item: savedHero.item,
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
    const chapterInfo = getChapterInfo(heroDB);
    const hpText = `${heroDB.hp}/${heroDB.hpMax} hp`;
    const stats = getStats(heroDB);
    const backstoryRevealed = heroDB.status > 1;
    const uniqueQuestCount = calcUtil.countUniqueItems(heroDB.completedQuestCodeLog);
    const uniqueChapterCount = calcUtil.countUniqueItems(heroDB.completedChapterCodeLog);
    return {
        announcement,
        name: heroDB.name,
        level: heroDB.level,
        hpText: hpText,
        stats,
        questInfo,
        chapterInfo,
        distanceTravelled: heroDB.distanceTravelled,
        distanceTravelledTotal: heroDB.distanceTravelledTotal,
        storyOver: heroDB.status === 99,
        hp: heroDB.hp,
        hpMax: heroDB.hpMax,
        journal: heroDB.journal,
        _id: heroDB._id,
        backstory: backstoryRevealed ? heroDB.backstory : "???",
        startDate: heroDB.startDate,
        deathDate: heroDB.deathDate,
        uniqueQuestCount,
        uniqueChapterCount,
        age: heroDB.journal.length,
    };
}
