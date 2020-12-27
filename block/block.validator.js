const boolUtil = require('../utilities/bool.util');

function checkForBlockCreateErrors(block) {
    const errors = checkForGeneralBlockErrors(block);
    if (boolUtil.hasValue(block._id)) {
        errors.push({ text: 'New block cannot have an id.' });
    }
    if (boolUtil.hasNoValue(block.creator)) {
        errors.push({ text: 'Please add a creator' });
    }
    return errors;
}

function checkForBlockEditErrors(block) {
    const errors = checkForGeneralBlockErrors(block);
    if (boolUtil.hasNoValue(block._id)) {
        errors.push({ text: 'Editing block must have an id.' });
    }
    return errors;
}

function checkForGeneralBlockErrors(block) {
    let errors = [];
    if (boolUtil.hasNoValue(block.title)) {
        errors.push({ text: 'Please add a title' });
    }
    if (boolUtil.hasNoValue(block.rule)) {
        errors.push({ text: 'Please add a rule' });
    }
    return errors;
}

module.exports = {
    checkForBlockEditErrors,
    checkForBlockCreateErrors
}
