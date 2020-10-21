function countUniqueItems(items) {
    const uniqueItems = getUniqueItems(items);
    return uniqueItems.length;
}

function getUniqueItems(items) {
    return items
        .filter((item, i, ar) => ar.indexOf(item) === i);
}

module.exports = {
    countUniqueItems,
    getUniqueItems,
}
