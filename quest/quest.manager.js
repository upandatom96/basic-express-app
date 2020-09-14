const mongoose = require('mongoose');
require('./Hero.model');
const Hero = mongoose.model('hero');

const heroGenerator = require('./hero-generator');
const nameManager = require('./quest-name.manager');
const heroProgressor = require('./hero-progressor');

function getAllHeroes() {
    return new Promise((resolve, reject) => {
        Hero.find({})
            .then((heroes) => {
                resolve(heroes);
            });
    });
}

function getCurrentHero() {
    return new Promise((resolve, reject) => {
        Hero.find( { status: { $ne: 99 } } )
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
        Hero.find( { status: { $ne: 99 } } )
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
            const lastJournalIndex = savedHero.journal.length - 1;
            const message = savedHero.journal[lastJournalIndex];
            resolve({
                name: savedHero.name,
                stats: {
                    strength: savedHero.strength,
                    wisdom: savedHero.wisdom,
                    dexterity: savedHero.dexterity,
                    charisma: savedHero.charisma,
                    ally: savedHero.ally,
                    item: savedHero.item,
                    ability: savedHero.ability,
                    weakness: savedHero.weakness,
                },
                hp: `${savedHero.hp}/${savedHero.hpMax} hp`,
                level: savedHero.level,
                message
            });
        });
}
