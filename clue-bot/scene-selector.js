const randomUtil = require('../utilities/random.util');

const SCENES = [
    "Scene One",
    "Scene Two",
    "Scene Three",
    "Scene Four",
    "Scene Five",
    "Scene Six",
    "Scene Seven",
    "Scene Eight",
];

function selectScenes(sceneCount) {
    const shuffledScenes = randomUtil.shuffleArray(SCENES);
    return shuffledScenes.slice(0, sceneCount);
}

module.exports = {
    selectScenes
}
