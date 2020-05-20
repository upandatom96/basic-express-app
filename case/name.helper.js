const boolUtil = require('../utilities/bool.util');

function areEssentialNamesSet(myCase) {
    return boolUtil.allHaveValues([
        myCase.judgeName,
        myCase.plaintiffName,
        myCase.defendantName
    ]);
}

function isAnyNameSet(myCase) {
    return boolUtil.anyHasValue([
        myCase.judgeName,
        myCase.plaintiffName,
        myCase.defendantName,
        myCase.witnessName1,
        myCase.witnessName2,
        myCase.witnessName3,
        myCase.witnessName4,
        myCase.witnessName5
    ]);
}

module.exports = {
    areEssentialNamesSet,
    isAnyNameSet
};
