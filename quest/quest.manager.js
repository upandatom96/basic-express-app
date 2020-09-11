const mongoose = require('mongoose');
require('./Hero.model');
const Hero = mongoose.model('hero');

function getAllHeroes() {
    return new Promise((resolve, reject) => {
        Hero.find({})
            .then((heroes) => {
                resolve(heroes);
            });
    });
}

module.exports = {
    getAllHeroes
}
