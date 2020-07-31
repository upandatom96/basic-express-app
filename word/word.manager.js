const randomUtil = require("../utilities/random.util");
const stringUtil = require("../utilities/string.util");
const request = require('request');

const DATAMUSE_BASE = 'http://api.datamuse.com/words';

function getSynonym(oldWord) {
    return new Promise((resolve, reject) => {
        const url = `${DATAMUSE_BASE}?ml=${oldWord}`;
        request(url, function (error, response, body) {
            const happyResponse = !error && response.statusCode === 200;
            if (happyResponse) {
                const synonymItems = JSON.parse(body);
                const synonyms = synonymItems.map((item) => {
                    return item.word;
                });
                resolve(synonyms);
            } else {
                reject();
            }
        })
    });
}

function swapAWord(oldPhrase) {
    const oldWord = fetchWordToReplace(oldPhrase);

    return new Promise((resolve, reject) => {
        getSynonym(oldWord)
            .then((synonyms) => {
                const newWord = randomUtil.pickRandomWithLimit(synonyms, 5);
                console.log(`${oldWord} -> ${newWord}`);
                const newPhrase = replaceWord(oldPhrase, oldWord, newWord);
                console.log(`${oldPhrase} -> ${newPhrase}`);
                resolve(newPhrase);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    getSynonym,
    swapAWord
}

function fetchWordToReplace(oldPhase) {
    const start = oldPhase.lastIndexOf("{") + 1;
    const end = oldPhase.lastIndexOf("}");
    return oldPhase.substring(start, end);
}

function replaceWord(oldPhase, wordToReplace, newWord) {
    return oldPhase.replace(`{${wordToReplace}}`, stringUtil.toTitleCase(newWord));
}
