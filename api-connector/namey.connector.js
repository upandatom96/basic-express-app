const request = require('request');

function findRareNames(nameCount) {
    const url = buildNameyUrl(nameCount, "rare", false);
    return queryNamey(url);
}

module.exports = {
    findRareNames
}

function queryNamey(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            const happyResponse = !error && response.statusCode === 200;
            if (happyResponse) {
                const names = getNamesFromResponse(body);
                resolve(names);
            } else {
                reject();
            }
        })
    });
}

function buildNameyUrl(nameCount, frequency, withSurname) {
    // https://namey.muffinlabs.com/
    const withSurnameString = withSurname ? "true" : false;
    const params = `?count=${nameCount}&with_surname=${withSurnameString}&frequency=${frequency}`;
    return `https://namey.muffinlabs.com/name.json${params}`;
}

function getNamesFromResponse(body) {
    return JSON.parse(body);
}
