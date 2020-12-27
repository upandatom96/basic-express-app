const boolUtil = require('../utilities/bool.util');

function checkForBlockDeckCreateErrors(blockDeck) {
    const errors = checkForGeneralBlockDeckErrors(blockDeck);
    if (boolUtil.hasValue(blockDeck._id)) {
        errors.push({ text: 'New block deck cannot have an id.' });
    }
    if (boolUtil.hasNoValue(blockDeck.creator)) {
        errors.push({ text: 'Please add a creator' });
    }
    return errors;
}

function checkForBlockDeckEditErrors(blockDeck) {
    const errors = checkForGeneralBlockDeckErrors(blockDeck);
    if (boolUtil.hasNoValue(blockDeck._id)) {
        errors.push({ text: 'Editing block deck must have an id.' });
    }
    return errors;
}

function checkForGeneralBlockDeckErrors(blockDeck) {
    let errors = [];
    if (boolUtil.hasNoValue(blockDeck.title)) {
        errors.push({ text: 'Please add a title' });
    }
    if (boolUtil.hasNoValue(blockDeck.description)) {
        errors.push({ text: 'Please add a description' });
    }
    if (boolUtil.hasNoValue(blockDeck.type)) {
        errors.push({ text: 'Please add a type' });
    }
    return errors;
}

module.exports = {
    checkForBlockDeckEditErrors,
    checkForBlockDeckCreateErrors
}
