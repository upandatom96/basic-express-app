const SPARKS_LYRICS = require('./sparks-lyrics');
const randomUtil = require('../utilities/random.util');

function getRandomSparksLyrics() {
    const lyrics = randomUtil.pickRandom(SPARKS_LYRICS.LYRICS);
    return {
        message: lyrics,
    };
}

module.exports = {
    getRandomSparksLyrics,
};
