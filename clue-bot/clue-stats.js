const CONSTANTS = require('../constants/constants.manager');

function getStats(clueBots) {
    const solvedMysteries = clueBots.filter((bot) => {
        return bot.solved
    });

    const victimOccurrences = checkOccurrences(solvedMysteries, "victim");
    const culpritOccurrences = checkOccurrences(solvedMysteries, "culprit");
    const murderWeaponOccurrences = checkOccurrences(solvedMysteries, "weapon");
    const crimeSceneOccurrences = checkOccurrences(solvedMysteries, "scene");

    const solvedMysteryCount = solvedMysteries.length;
    const mysteryCount = clueBots.length;

    const suspectCount = CONSTANTS.CULPRITS.length;
    const sceneCount = CONSTANTS.SCENES.length;
    const weaponCount = CONSTANTS.WEAPONS.length;

    return {
        mysteryCount,
        solvedMysteryCount,
        suspectCount,
        sceneCount,
        weaponCount,
        victimOccurrences,
        culpritOccurrences,
        murderWeaponOccurrences,
        crimeSceneOccurrences
    };
}

module.exports = {
    getStats
}

function checkOccurrences(solvedMysteries, attribute) {
    const occurrences = [];
    solvedMysteries.forEach((mystery) => {
        const repeatOccurrence = occurrences.find((occurrence) => {
            return occurrence.name === mystery[attribute];
        });
        if (repeatOccurrence) {
            repeatOccurrence.count++;
        } else {
            const firstOccurrence = {
                name: mystery[attribute],
                count: 1,
            };
            occurrences.push(firstOccurrence);
        }
    });
    return occurrences;
}
