const mongoose = require('mongoose');
require('./Hero.model');
const Hero = mongoose.model('hero');

const heroGenerator = require('./hero-generator');
const nameManager = require('./quest-name.manager');
const heroProgressor = require('./hero-progressor');
const questStatHelper = require('./quest-stat-helper');
const codeRetriever = require('./code-retriever');
const characterRoller = require('../character/character.roller');

const HeroMoves = require('../constants/quest/hero-moves');

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
        Hero.find({})
            .then((heroes) => {
                const heroReports = getHeroReports(heroes);
                const heroStats = questStatHelper.getStatsForHeroes(heroReports);
                resolve(heroStats);
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
            delete heroReport.journal;
            resolve(heroReport);
        });
}

function getLatestMessage(savedHero) {
    const lastJournalIndex = savedHero.journal.length - 1;
    return savedHero.journal[lastJournalIndex];
}

function getAlignment(hero) {
    return characterRoller.getFullAlignment(hero.alignmentGoodVsEvil, hero.alignmentLawVsChaos);
}

function getStats(savedHero) {
    return {
        // base stats
        strength: savedHero.strength,
        wisdom: savedHero.wisdom,
        dexterity: savedHero.dexterity,
        charisma: savedHero.charisma,
        // special stats
        advantage: savedHero.advantage,
        disadvantage: savedHero.disadvantage,
        specialAdjective: savedHero.specialAdjective,
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

function getCompletedChapters(heroDB) {
    return heroDB.completedChapterLog
        .map((chapterName) => {
            return codeRetriever.findChapterEvent(chapterName).name;
        });
}

function getCompletedQuests(heroDB) {
    return heroDB.completedQuestLog
        .map((questName) => {
            return codeRetriever.findQuest(questName).name;
        });
}

function getHeroReport(heroDB) {
    const announcement = getLatestMessage(heroDB);
    const alignment = getAlignment(heroDB);
    const quest = codeRetriever.findQuest(heroDB.currentQuestName);
    const chapter = codeRetriever.findChapterEvent(heroDB.currentChapterName);
    const stats = getStats(heroDB);
    const completedQuests = getCompletedQuests(heroDB);
    const completedChapters = getCompletedChapters(heroDB);
    const uniqueCompletedQuests = calcUtil.getUniqueItems(completedQuests);
    const uniqueCompletedChapters = calcUtil.getUniqueItems(completedChapters);
    const specialMoves = codeRetriever.findSpecialMoves(heroDB.specialMoves);
    const standardMoves = HeroMoves.STANDARD_MOVES;
    const hpText = `${heroDB.hp}/${heroDB.hpMax} hp`;
    const levelThreshold = (heroDB.level * 100) + ((heroDB.level - 1) * (heroDB.level) * 10);
    const expText = `${heroDB.expPoints}/${levelThreshold} exp`;
    const distanceText = boolUtil.hasValue(quest) ? `${heroDB.distanceTravelled}/${quest.distanceRequired} miles` : null;
    const currentQuest = boolUtil.hasValue(quest) ? quest.name : null;
    const currentQuestDetails = boolUtil.hasValue(quest) ? `They must travel to ${quest.destination} and ${quest.text}.` : null;
    const currentChapter = boolUtil.hasValue(chapter) ? chapter.name : null;
    return {
        announcement,
        name: heroDB.name,
        race: heroDB.race,
        alignment: alignment,
        _id: heroDB._id,
        hpText,
        expText,
        distanceText,
        currentQuest,
        currentQuestDetails,
        currentChapter,
        level: heroDB.level,
        expPoints: heroDB.expPoints,
        status: heroDB.status,
        specialMoves,
        standardMoves,
        stats,
        inventory: heroDB.inventory,
        party: heroDB.party,
        storyOver: heroDB.status === 99,
        startDate: heroDB.startDate,
        deathDate: heroDB.deathDate,
        completedChapters,
        completedQuests,
        uniqueCompletedChapters,
        uniqueCompletedQuests,
        distanceTravelledTotal: heroDB.distanceTravelledTotal,
        damageTakenTotal: heroDB.damageTakenTotal,
        age: heroDB.journal.length,
        seed: heroDB.seed,
        journal: heroDB.journal,
    };
}
