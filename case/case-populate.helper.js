const witnessPopulator = require('./witness-populate.helper');
const evidencePopulator = require('./evidence-populate.helper');

const nameHelper = require('./name.helper');
const witnessHelper = require('./witness.helper');
const statusHelper = require('./case-status.helper');

const boolUtil = require('../utilities/bool.util');

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

function buildWitnessPlayers(myCase) {
    const witnessPlayers = [];
    if (myCase.witness1NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName1,
            character: myCase.selectedWitness1
        });
    }
    if (myCase.witness1NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName2,
            character: myCase.selectedWitness2
        });
    }
    if (myCase.witness3NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName3,
            character: myCase.selectedWitness3
        });
    }
    if (myCase.witness4NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName4,
            character: myCase.selectedWitness4
        });
    }
    if (myCase.witness5NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName5,
            character: myCase.selectedWitness5
        });
    }
    return witnessPlayers;
}

function addAttributes(myCase) {
    // general attributes
    myCase.fullCaseName = "The Case of the " + myCase.name;

    // player name attributes
    myCase.areEssentialNamesSet = nameHelper.areEssentialNamesSet(myCase);
    myCase.isAnyNameSet = nameHelper.isAnyNameSet(myCase);
    myCase.howManyPlayerNames = nameHelper.howManyPlayerNames(myCase);
    myCase.howManyWitnessNames = nameHelper.howManyWitnesses(myCase);
    myCase.judgeNameSet = boolUtil.hasValue(myCase.judgeName);
    myCase.plaintiffNameSet = boolUtil.hasValue(myCase.plaintiffName);
    myCase.defendantNameSet = boolUtil.hasValue(myCase.defendantName);
    myCase.witness1NameSet = boolUtil.hasValue(myCase.witnessName1);
    myCase.witness2NameSet = boolUtil.hasValue(myCase.witnessName2);
    myCase.witness3NameSet = boolUtil.hasValue(myCase.witnessName3);
    myCase.witness4NameSet = boolUtil.hasValue(myCase.witnessName4);
    myCase.witness5NameSet = boolUtil.hasValue(myCase.witnessName5);

    myCase.howManyWitnessesSelected = witnessHelper.howManyWitnessesSelected(myCase);
    myCase.allWitnessesReady = myCase.howManyWitnessesSelected === myCase.howManyPlayerNames;
    myCase.witnessPlayers = buildWitnessPlayers(myCase);

    // evidence - # selected P
    // evidence - # selected D
    // evidence - all selected P
    // evidence - all selected D

    // evidence - # revealed P
    // evidence - # revealed D
    // evidence - all revealed P
    // evidence - all revealed D

    myCase.statusText = statusHelper.getStatusText(myCase);
    myCase.isAssignRoles = statusHelper.isAssignRoles(myCase);
    myCase.isMakeSelections = statusHelper.isMakeSelections(myCase);
    myCase.isFreeTime = statusHelper.isFreeTime(myCase);
    myCase.isOpeningArguments = statusHelper.isOpeningArguments(myCase);
    myCase.isCrossfire = statusHelper.isCrossfire(myCase);
    myCase.isClosingArguments = statusHelper.isClosingArguments(myCase);
    myCase.isVerdictSelection = statusHelper.isVerdictSelection(myCase);
    myCase.isClosed = statusHelper.isClosed(myCase);
    myCase.isInProgress = statusHelper.isInProgress(myCase);

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
