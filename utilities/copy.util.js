function copy(obj) {
    const stringObj = JSON.stringify(obj);
    return JSON.parse(stringObj);
}

module.exports = {
    copy,
};
