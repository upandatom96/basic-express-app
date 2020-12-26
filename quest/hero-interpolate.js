const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');
const boolUtil = require('../utilities/bool.util');

function interpolate(stringToReplace, hero) {
    const firstName = getFirstName(hero.name);
    const lastName = getLastName(hero.name);
    const weather = getWeather(hero.weather);
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{HERO_FULL}`, hero.name);
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{HERO_FIRST}`, firstName);
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{HERO_LAST}`, lastName);
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{HERO_RACE}`, hero.race.toLowerCase());
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{ADV}`, hero.advantage);
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{DIS}`, hero.disadvantage);
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{RA}`, hero.randomAdjective.toLowerCase());
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{RAC}`, hero.randomAdjective.toUpperCase());
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{RAFC}`, stringUtil.capitalizeFirstLetter(hero.randomAdjective.toLowerCase()));
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{RN}`, hero.randomNoun.toLowerCase());
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{RNFC}`, stringUtil.capitalizeFirstLetter(hero.randomNoun.toLowerCase()));
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{RNC}`, hero.randomNoun.toUpperCase());
    stringToReplace = stringUtil.replaceGlobally(stringToReplace, `{WEATHER}`, weather);
    stringToReplace = stringUtil.capitalizeFirstLetter(stringToReplace);
    return stringToReplace;
}

module.exports = {
    interpolate,
};

function getFirstName(heroName) {
    return heroName.split(' ').slice(0, -1).join(' ');
}

function getLastName(heroName) {
    return heroName.split(' ').slice(-1).join(' ');
}

function getWeather(weather) {
    if (boolUtil.hasNoValue(weather)) {
        return randomUtil.pickRandom(["cloudy", "clear"]);
    } else {
        return weather;
    }
}
