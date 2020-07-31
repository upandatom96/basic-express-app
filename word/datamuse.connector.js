const request = require('request');

const DATAMUSE_BASE = 'http://api.datamuse.com/words';

function retrieveSynonyms(oldWord) {
    return new Promise((resolve, reject) => {
        const url = `${DATAMUSE_BASE}?ml=${oldWord}`;
        request(url, function (error, response, body) {
            const happyResponse = !error && response.statusCode === 200;
            if (happyResponse) {
                const words = getWordsFromResponse(body);
                resolve(words);
            } else {
                reject();
            }
        })
    });
}

module.exports = {
    retrieveSynonyms
}

function getWordsFromResponse(body) {
    const items = JSON.parse(body);
    return items.map((item) => {
        return item.word;
    });
}
