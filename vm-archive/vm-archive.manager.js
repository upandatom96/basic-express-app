const fs = require('fs');

const boolUtil = require('../utilities/bool.util');
const csvUtil = require('../utilities/csv.util');

function getShows() {
    return new Promise(async (resolve, reject) => {
        try {
            fs.readFile("vm-archive/vm-shows.csv", function read(err, data) {
                if (err) {
                    throw err;
                }
                const shows = csvUtil.readCsv(data + "");
                const convertedShows = convertShows(shows);
                resolve(convertedShows);
            });
        } catch (err) {
            reject(err);
        }

    });
}

module.exports = {
    getShows,
}

function convertShows(shows) {
    return shows
        .filter((show) => {
            return show.year !== "";
        })
        .map((show) => {
            show.soldOut = boolUtil.translateBooleanString(show.soldOut);
            show.canceled = boolUtil.translateBooleanString(show.canceled);
            show.postponed = boolUtil.translateBooleanString(show.postponed);
            show.acts = show.lineup.split("|")
                .map((act) => {
                    return act.trim();
                });
            show.fullDate = `${show.month} ${show.date}, ${show.year} at ${show.time}`;
            return show;
        });
}
