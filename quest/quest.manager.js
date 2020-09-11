const mongoose = require('mongoose');
require('./Hero.model');
const Hero = mongoose.model('hero');

const heroGenerator = require('./hero-generator');
const nameManager = require('./quest-name.manager');

const boolUtil = require('../utilities/bool.util');

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

module.exports = {
    getAllHeroes,
    getCurrentHero,
    deleteHero,
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
    resolve("advancing hero...");
    // const updatedHero = heroProgressor.progressHero(hero);
    // updatedHero.save()
    //     .then((response) => {
    //         const lastJournal = response.journal.length - 1;
    //         const message = response.journal[lastJournal];
    //         resolve(message);
    //     });
}

