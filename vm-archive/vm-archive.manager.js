const csv = require('csv-parser');
const fs = require('fs');

const boolUtil = require('../utilities/bool.util');
const csvUtil = require('../utilities/csv.util');

function getShowsForDay(date, month) {
    return new Promise(async (resolve, reject) => {
        try {
            const fittingShows = await getShowsForDate(date, month);
            resolve(fittingShows);
        } catch (err) {
            reject(err);
        }
    });
}

function getShowsToday() {
    return new Promise(async (resolve, reject) => {
        try {
            const today = new Date();
            const fittingShows = await getShowsForDate(today.getDate(), today.getUTCMonth());
            resolve(fittingShows);
        } catch (err) {
            reject(err);
        }
    });
}

function getShows() {
    return new Promise(async (resolve, reject) => {
        try {
            const initialShows = [];
            fs.createReadStream("vm-archive/vm-shows.csv")
                .pipe(csv())
                .on('data', (show) => {
                    if (boolUtil.hasValue(show) && !boolUtil.isEmpty(show)) {
                        initialShows.push(show);
                    }
                })
                .on('end', () => {
                    console.log(initialShows.length + " show(s)...")
                    const convertedShows = convertShows(initialShows);
                    resolve(convertedShows);
                });
            // fs.readFile("vm-archive/vm-shows.csv", function read(err, data) {
            //     if (err) {
            //         throw err;
            //     }
            //     const shows = csvUtil.readCsv(data + "");
            //     console.log(shows.length + " show(s)...");
            //     const convertedShows = convertShows(shows);
            //     resolve(convertedShows);
            // });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    getShows,
    getShowsToday,
    getShowsForDay,
}

function convertShows(shows) {
    return shows
        .map((show) => {
            show.year = Number(show.year);
            show.date = Number(show.date);
            show.soldOut = boolUtil.translateBooleanString(show.soldOut);
            show.canceled = boolUtil.translateBooleanString(show.canceled);
            show.postponed = boolUtil.translateBooleanString(show.postponed);
            show.acts = show.lineup.split("|")
                .map((act) => {
                    return act.trim();
                });
            delete show.lineup;
            show.fullDate = `${show.month} ${show.date}, ${show.year} at ${show.time}`;
            return show;
        });
}

function getMonthName(monthNumber) {
    const monthNames = ["january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    return monthNames[monthNumber];
}

async function getShowsForDate(date, month) {
    const shows = await getShows();
    return shows
        .filter((show) => {
            return show.date === date;
        })
        .filter((show) => {
            return show.month.toLowerCase() === getMonthName(month).toLowerCase();
        });
}
