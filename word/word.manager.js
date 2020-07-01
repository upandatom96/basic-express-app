const randomUtil = require("../utilities/random.util");
const stringUtil = require("../utilities/string.util");
const request = require('request');

function getSynonym(oldWord) {
    return new Promise((resolve, reject) => {
        const synonymRequest = 'http://api.datamuse.com/words?ml=' + oldWord;
        request(synonymRequest, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const newWord = getNewWordFromResponse(body);
                console.log(`${oldWord} -> ${newWord}`);
                resolve(newWord);
            } else {
                reject();
            }
        })
    });
}

function swapAWord(oldPhase) {
    const wordToReplace = fetchWordToReplace(oldPhase);

    return new Promise((resolve, reject) => {
        getSynonym(wordToReplace)
            .then((newWord) => {
                const newPhrase = oldPhase.replace(`{${wordToReplace}}`, stringUtil.toTitleCase(newWord));
                console.log(`${oldPhase} -> ${newPhrase}`);
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

function getNewWordFromResponse(body) {
    const synonyms = JSON.parse(body);
    const topFive = synonyms.slice(0, 5);
    const oneSelected = randomUtil.pickRandom(topFive);
    return oneSelected.word;
}

function fetchWordToReplace(oldPhase) {
    return oldPhase.substring(
        oldPhase.lastIndexOf("{") + 1,
        oldPhase.lastIndexOf("}")
    );
}
