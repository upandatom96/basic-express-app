const boolUtil = require('../utilities/bool.util');

function checkForCreateErrors(muppet) {
    const errors = checkForGeneralErrors(muppet);
    if (boolUtil.hasValue(muppet._id)) {
        errors.push({ text: 'Create cannot have an id.' });
    }
    return errors;
}

function checkForEditErrors(muppet) {
    const errors = checkForGeneralErrors(muppet);
    if (boolUtil.hasNoValue(muppet._id)) {
        errors.push({ text: 'Edit must have an id.' });
    }
    return errors;
}

function checkForGeneralErrors(muppet) {
    const fields = [
        "name",
        "debutYear",
        "commonality",
        "speechType",
        "mainSeries",
        "creature",
        "starQuality",
        "cuteness",
        "imagination",
        "storytelling",
        "humor",
        "aloofness",
        "mischief",
        "floppiness",
        "fuzziness",
        "softness",
        "strength",
        "wisdom",
        "intelligence",
        "constitution",
        "charisma",
        "dexterity",
        "muppetRank",
        "alignment",
        "archived",
    ];
    return boolUtil.collectErrors(muppet, fields);
}

module.exports = {
    checkForCreateErrors,
    checkForEditErrors
}
