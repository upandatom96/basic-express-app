const request = require('request');

function findRareNames(nameCount, withSurname) {
    const url = buildNameyUrl(nameCount, "rare", withSurname);
    return queryNamey(url);
}

function findAnyNames(nameCount, withSurname) {
    const url = buildNameyUrl(nameCount, "all", withSurname);
    return queryNamey(url);
}

function findCommonNames(nameCount, withSurname) {
    const url = buildNameyUrl(nameCount, "common", withSurname);
    return queryNamey(url);
}

module.exports = {
    findRareNames,
    findAnyNames,
    findCommonNames,
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
