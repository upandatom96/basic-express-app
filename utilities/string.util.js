function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function replaceGlobally(originalString, wordToReplace, replacement) {
    const regex = new RegExp(wordToReplace, 'g');
    return originalString.replace(regex, replacement);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    toTitleCase,
    replaceGlobally,
    capitalizeFirstLetter
};
