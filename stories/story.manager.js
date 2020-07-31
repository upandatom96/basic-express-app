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

function buildNewPhrase(wordOptions, oldWord, storyBase) {
    const newWord = randomUtil.pickRandom(wordOptions);
    console.log(`${oldWord} -> ${newWord}`);
    const newPhrase = replaceGlobally(storyBase, `{${oldWord}}`, stringUtil.toTitleCase(newWord));
    console.log(`${storyBase} -> ${newPhrase}`);
    return newPhrase;
}

async function getSuperRandomStory() {
    try {
        const storyBase = randomManager.pickStoryBase();
        const oldWord = fetchWordToReplace(storyBase);

        const meansLike = await datamuseConnector.retrieveSimilarMeaningPhrases(oldWord)
        const rhymes = await datamuseConnector.retrieveRhymes(oldWord)

        const wordOptions = [].concat(meansLike, rhymes);

        return buildNewPhrase(wordOptions, oldWord, storyBase);
    } catch (error) {
        console.error(error);
    }
}

function getRandomSynonymStory() {
    return new Promise((resolve, reject) => {
        const storyBase = randomManager.pickStoryBase();
        const oldWord = fetchWordToReplace(storyBase);

        datamuseConnector.retrieveSimilarMeaningPhrases(oldWord)
            .then((wordOptions) => {
                const newPhrase = buildNewPhrase(wordOptions, oldWord, storyBase);
                resolve(newPhrase);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    getSuperRandomStory,
    getRandomStory,
    getRandomSynonymStory
}

function fetchWordToReplace(oldPhase) {
    const start = oldPhase.lastIndexOf("{") + 1;
    const end = oldPhase.lastIndexOf("}");
    return oldPhase.substring(start, end);
}
