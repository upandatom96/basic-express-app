const witnessPopulator = require('./witness-populate.helper');
const evidencePopulator = require('./evidence-populate.helper');

const nameHelper = require('./name.helper');

function cloneCase(myCase) {
    return {
        _id: myCase._id,
        name: myCase.name,
        closedDate: myCase.closedDate,
        openedDate: myCase.openedDate,
        lastStatusUpdateDate: myCase.lastStatusUpdateDate,
        status: myCase.status,
        isDefendantGuilty: myCase.isDefendantGuilty,
        issue: myCase.issue,
        judgeName: myCase.judgeName,
        plaintiffName: myCase.plaintiffName,
        defendantName: myCase.defendantName,
        witnessName1: myCase.witnessName1,
        witnessName2: myCase.witnessName2,
        witnessName3: myCase.witnessName3,
        witnessName4: myCase.witnessName4,
        witnessName5: myCase.witnessName5,
    };
}

function addAttributes(myCase) {
    myCase.fullCaseName = "The Case of the " + myCase.name;

    myCase.areEssentialNamesSet = nameHelper.areEssentialNamesSet(myCase);
    myCase.isAnyNameSet = nameHelper.isAnyNameSet(myCase);
    // has name (each)
    // # of names

    // has witness name (each)
    // has witness name (any)
    // # of witness names
    // # of witnesses selected
    // all witnesses selected
    // witness player array

    // evidence - # selected P
    // evidence - # selected D
    // evidence - all selected P
    // evidence - all selected D
    // evidence - # revealed P
    // evidence - # revealed D
    // evidence - all revealed P
    // evidence - all revealed D

    // status booleans
    // status string
    // status ongoing

    return myCase;
}

function populateCase(myCase) {
    let fullCase = cloneCase(myCase);
    fullCase = witnessPopulator.populateWitnesses(myCase, fullCase);
    fullCase = evidencePopulator.populateEvidence(myCase, fullCase);
    return addAttributes(fullCase);
}

function populateCases(myCases) {
    const populatedCases = [];
    myCases.forEach((myCase) => {
        const populatedCase = populateCase(myCase);
        populatedCases.push(populatedCase);
    })
    return populatedCases;
}

module.exports = {
    populateCase,
    populateCases
};
