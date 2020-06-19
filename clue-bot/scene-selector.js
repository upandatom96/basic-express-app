const randomUtil = require('../utilities/random.util');

const SCENES = [
    "The Pool",
    "The Observatory",
    "The Kitchen",
    "The Art Studio",
    "The Wine Cellar",
    "The Bathroom",
    "The Backyard",
    "The Garage",
    "The Study",
    "The Dining Room",
    "The Master Bedroom",
    "The Guest Bedroom",
    "The Theatre",
    "The Panic Room",
    "The Library",
    "The Green House",
    "The Billiard Room",
    "The Lounge",
    "The Ballroom",
    "The Sitting Room",
    "The Foyer",
    "The Sauna",
    "The Junk Room",
    "The Workshop",
    "The Crawlspace",
    "The Bowling Alley",
    "The Music Room",
    "The Sanctuary",
];

function selectScenes(sceneCount) {
    const shuffledScenes = randomUtil.shuffleArray(SCENES);
    return shuffledScenes.slice(0, sceneCount);
}

module.exports = {
    selectScenes
}
