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
    let errors = [];
    if (boolUtil.hasNoValue(muppet.name)) {
        errors.push({ text: 'Please add a name' });
    }
    return errors;
}

module.exports = {
    checkForCreateErrors,
    checkForEditErrors
}
