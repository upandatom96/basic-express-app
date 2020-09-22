function countUniqueItems(items) {
    const uniqueItems = items
        .filter((item, i, ar) => ar.indexOf(item) === i);
    return uniqueItems.length;
}

module.exports = {
    countUniqueItems
}
