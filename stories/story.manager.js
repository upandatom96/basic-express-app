const randomManager = require("../random/random.manager");
const datamuseConnector = require("../word/datamuse.connector");
const stringUtil = require('../utilities/string.util');
const randomUtil = require('../utilities/random.util');

function getRandomStory() {
    const noun1 = stringUtil.toTitleCase(randomManager.pickNoun());
    const noun2 = stringUtil.toTitleCase(randomManager.pickNoun());
    const adjective1 = stringUtil.toTitleCase(randomManager.pickAdjective());
    const adjective2 = stringUtil.toTitleCase(randomManager.pickAdjective());
    let storyPrefix = randomManager.pickStoryPrefix();
    storyPrefix = replaceGlobally(storyPrefix, "{N1}", noun1);
    storyPrefix = replaceGlobally(storyPrefix, "{N2}", noun2);
    storyPrefix = replaceGlobally(storyPrefix, "{A1}", adjective1);
    storyPrefix = replaceGlobally(storyPrefix, "{A2}", adjective2);
    return storyPrefix;
}

function replaceGlobally(originalString, wordToReplace, replacement) {
    const regex = new RegExp(wordToReplace, 'g');
    return originalString.replace(regex, replacement);
}

function buildNewPhase(wordOptions, oldWord, storyBase) {
    const newWord = randomUtil.pickRandomWithLimit(wordOptions, 5);
    console.log(`${oldWord} -> ${newWord}`);
    const newPhrase = replaceGlobally(storyBase, `{${oldWord}}`, stringUtil.toTitleCase(newWord));
    console.log(`${storyBase} -> ${newPhrase}`);
    return newPhrase;
}

function getRandomSynonymStory() {
    return new Promise((resolve, reject) => {
        const storyBase = randomManager.pickStoryBase();
        const oldWord = fetchWordToReplace(storyBase);

        datamuseConnector.retrieveSynonyms(oldWord)
            .then((wordOptions) => {
                const newPhrase = buildNewPhase(wordOptions, oldWord, storyBase);
                resolve(newPhrase);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    getRandomStory,
    getRandomSynonymStory
}

function fetchWordToReplace(oldPhase) {
    const start = oldPhase.lastIndexOf("{") + 1;
    const end = oldPhase.lastIndexOf("}");
    return oldPhase.substring(start, end);
}
