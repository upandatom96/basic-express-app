const nameHelper = require('./name.helper');
const witnessHelper = require('./witness.helper');
const evidenceHelper = require('./evidence.helper');
const statusHelper = require('./case-status.helper');

const boolUtil = require('../utilities/bool.util');

function buildWitnessPlayers(myCase) {
    const witnessPlayers = [];
    if (myCase.witness1NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName1,
            character: myCase.selectedWitness1,
            witnessNumber: 1
        });
    }
    if (myCase.witness2NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName2,
            character: myCase.selectedWitness2,
            witnessNumber: 2
        });
    }
    if (myCase.witness3NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName3,
            character: myCase.selectedWitness3,
            witnessNumber: 3
        });
    }
    if (myCase.witness4NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName4,
            character: myCase.selectedWitness4,
            witnessNumber: 4
        });
    }
    if (myCase.witness5NameSet) {
        witnessPlayers.push({
            name: myCase.witnessName5,
            character: myCase.selectedWitness5,
            witnessNumber: 5
        });
    }
    return witnessPlayers;
}

function addStatusAttributes(myCase) {
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
    myCase.verdictIsNext = statusHelper.verdictIsNext(myCase);
    return myCase;
}

function addEvidenceAttributes(myCase) {
    myCase.isAllPlaintiffEvidenceSelected = evidenceHelper.isAllPlaintiffEvidenceSelected(myCase);
    myCase.isAllDefendantEvidenceSelected = evidenceHelper.isAllDefendantEvidenceSelected(myCase);
    myCase.isAllEvidenceSelected = evidenceHelper.isAllEvidenceSelected(myCase);
    myCase.isAllPlaintiffEvidenceRevealed = evidenceHelper.isAllPlaintiffEvidenceRevealed(myCase);
    myCase.isAllDefendantEvidenceRevealed = evidenceHelper.isAllDefendantEvidenceRevealed(myCase);
    myCase.isAllEvidenceRevealed = evidenceHelper.isAllEvidenceRevealed(myCase);
    return myCase;
}

function addWitnessAttributes(myCase) {
    myCase.howManyWitnessesSelected = witnessHelper.howManyWitnessesSelected(myCase);
    myCase.allWitnessesReady = myCase.howManyWitnessesSelected === myCase.howManyPlayerNames;
    myCase.witnessPlayers = buildWitnessPlayers(myCase);
    return myCase;
}

function addNameAttributes(myCase) {
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
    return myCase;
}

function addGeneralAttributes(myCase) {
    myCase.fullCaseName = "The Case of the " + myCase.name;
    myCase.fullIssue = "The Plaintiff claims that The Defendant " + myCase.issue;
    return myCase;
}

function addCaseAttributes(myCase) {
    myCase = addGeneralAttributes(myCase);
    myCase = addNameAttributes(myCase);
    myCase = addWitnessAttributes(myCase);
    myCase = addEvidenceAttributes(myCase);
    return addStatusAttributes(myCase);
}

module.exports = {
    addCaseAttributes
};
