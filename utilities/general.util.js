const booleanHelper = require('../utilities/bool.util');

function translateIndicesToValues(indices, values) {
    const translatedItems = [];
    indices.forEach((index) => {
        const item = translateIndexToValue(index, values);
        translatedItems.push(item);
    });
    return translatedItems;
}

function translateIndexToValue(index, values) {
    if (booleanHelper.hasValue(index)) {
        const item = values[index];
        return {
            name: item,
            _id: index
        };
    } else {
        return null;
    }
}

module.exports = {
    translateIndicesToValues,
    translateIndexToValue
};
