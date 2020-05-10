const timeUtil = require('../utilities/time.util');
const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const boolUtil = require('../utilities/bool.util');
const caseConstants = require('./case.constants');

function orderCasesByDate(cases) {
    return cases.sort(function (caseA, caseB) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(caseB.openedDate) - new Date(caseA.openedDate);
    });
}

function orderSortedCasesByDate(sortedCases) {
    sortedCases.openCases = orderCasesByDate(sortedCases.openCases);
    sortedCases.closedCases = orderCasesByDate(sortedCases.closedCases);
    sortedCases.limboCases = orderCasesByDate(sortedCases.limboCases);
    return sortedCases
}

function sortCasesByStatus(cases) {
    const sortedCases = {
        openCases: [],
        closedCases: [],
        limboCases: [],
    };
    cases.forEach((myCase) => {
        const fullCase = populateValues(myCase);
        if (isCaseLimbo(fullCase)) {
            sortedCases.limboCases.push(fullCase);
        } else if (isCaseStatusClosed(fullCase)) {
            sortedCases.closedCases.push(fullCase);
        } else {
            sortedCases.openCases.push(fullCase);
        }
    });
    return sortedCases;
}

function isCaseOpen(myCase) {
    return !isCaseStatusClosed(myCase) && !isCaseLimbo(myCase);
}

function isCaseStatusAssignRoles(myCase) {
    return myCase.status === caseConstants.ASSIGN_ROLES;
}

function isCaseStatusMakeSelections(myCase) {
    return myCase.status === caseConstants.MAKE_SELECTIONS;
}

function isCaseStatusOpeningArguments(myCase) {
    return myCase.status === caseConstants.OPENING_ARGUMENTS;
}

function isCaseStatusCrossfire(myCase) {
    return myCase.status === caseConstants.CROSSFIRE;
}

function isCaseStatusClosingArguments(myCase) {
    return myCase.status === caseConstants.CLOSING_ARGUMENTS;
}

function isCaseStatusFreeTime(myCase) {
    return myCase.status === caseConstants.FREE_TIME;
}

function isCaseStatusVerdictSelection(myCase) {
    return myCase.status === caseConstants.VERDICT_SELECTION;
}

function isCaseStatusClosed(myCase) {
    return myCase.status === caseConstants.CASE_CLOSED;
}

function isCaseLimbo(myCase) {
    if (isCaseStatusClosed(myCase)) {
        return false;
    }
    return timeUtil.have24HoursPast(myCase.openedDate);
}

function getUnusedCaseName(allCases) {
    const oldNames = [];
    allCases.forEach((thisCase) => {
        oldNames.push(thisCase.name);
    });
    const caseName = randomManager.getNewPhrase(oldNames);
    return stringUtil.toTitleCase(caseName);
}

function isAllEvidenceRevealed(myCase) {
    const revealedAllPE = myCase.unrevealedDefendantEvidence.length === 0;
    const revealedAllDE = myCase.unrevealedDefendantEvidence.length === 0;
    return revealedAllPE && revealedAllDE;
}

function hasMaxWitnesses(myCase) {
    return boolUtil.allHaveValues(
        [
            myCase.witnessName1,
            myCase.witnessName2,
            myCase.witnessName3,
            myCase.witnessName4,
            myCase.witnessName5
        ]
        );
}

function hasWitnessNameAlready(myCase, witnessName) {
    const match1 = myCase.witnessName1 === witnessName;
    const match2 = myCase.witnessName2 === witnessName;
    const match3 = myCase.witnessName3 === witnessName;
    const match4 = myCase.witnessName4 === witnessName;
    const match5 = myCase.witnessName5 === witnessName;
    return match1 || match2 || match3 || match4 || match5;
}

function addWitness(myCase, witnessName) {
    if (boolUtil.hasNoValue(myCase.witnessName1)) {
        myCase.witnessName1 = witnessName;
    } else if (boolUtil.hasNoValue(myCase.witnessName2)) {
        myCase.witnessName2 = witnessName;
    } else if (boolUtil.hasNoValue(myCase.witnessName3)) {
        myCase.witnessName3 = witnessName;
    } else if (boolUtil.hasNoValue(myCase.witnessName4)) {
        myCase.witnessName4 = witnessName;
    } else if (boolUtil.hasNoValue(myCase.witnessName5)) {
        myCase.witnessName5 = witnessName;
    }
}

function removeWitness(myCase, witnessName) {
    if (myCase.witnessName1 === witnessName) {
        myCase.witnessName1 = null;
    } else if (myCase.witnessName2 === witnessName) {
        myCase.witnessName2 = null;
    } else if (myCase.witnessName3 === witnessName) {
        myCase.witnessName3 = null;
    } else if (myCase.witnessName4 === witnessName) {
        myCase.witnessName4 = null;
    } else if (myCase.witnessName5 === witnessName) {
        myCase.witnessName5 = null;
    }
}

function canMakeVerdict(myCase) {
    const revealedAllEvidence = isAllEvidenceRevealed(myCase);
    const statusReady = isCaseStatusClosingArguments(myCase) || isCaseStatusFreeTime(myCase);
    return revealedAllEvidence && statusReady;
}

function areEssentialNamesSet(myCase) {
    const hasJudgeName = boolUtil.hasValue(myCase.judgeName);
    const hasPName = boolUtil.hasValue(myCase.plaintiffName);
    const hasDName = boolUtil.hasValue(myCase.defendantName);
    return hasJudgeName && hasPName && hasDName;
}

function canLockRoles(myCase) {
    const namesSet = areEssentialNamesSet(myCase);
    const assigningRoles = isCaseStatusAssignRoles(myCase);
    return assigningRoles && namesSet;
}

function areSelectionsComplete(myCase) {
    const evidenceSelected = isAllEvidenceSelected(myCase);
    const makingSelections = isCaseStatusMakeSelections(myCase);
    return evidenceSelected && makingSelections;
}

function isAllPlaintiffEvidenceSelected(myCase) {
    return myCase.plaintiffEvidenceSelected.length >= 5;
}

function isAllDefendantEvidenceSelected(myCase) {
    return myCase.defendantEvidenceSelected.length >= 5;
}

function isAllPlaintiffEvidenceRevealed(myCase) {
    return myCase.plaintiffEvidenceCourt.length >= 5;
}

function isAllDefendantEvidenceRevealed(myCase) {
    return myCase.defendantEvidenceCourt.length >= 5;
}

function isAllEvidenceSelected(myCase) {
    const pEvidenceSelected = isAllPlaintiffEvidenceSelected(myCase);
    const dEvidenceSelected = isAllDefendantEvidenceSelected(myCase);
    return pEvidenceSelected && dEvidenceSelected;
}

function isCaseInProgress(myCase) {
    return isCaseStatusOpeningArguments(myCase) || isCaseStatusCrossfire(myCase) ||
        isCaseStatusClosingArguments(myCase) || isCaseStatusFreeTime(myCase);
}

function canRevealPlaintiffEvidence(myCase) {
    const caseInProgress = isCaseInProgress(myCase);
    const allRevealed = isAllPlaintiffEvidenceRevealed(myCase);
    return caseInProgress && !allRevealed;
}

function canRevealDefendantEvidence(myCase) {
    const caseInProgress = isCaseInProgress(myCase);
    const allSelected = isAllDefendantEvidenceRevealed(myCase);
    return caseInProgress && !allSelected;
}

function canSelectPlaintiffEvidence(myCase) {
    const caseInProgress = isCaseStatusMakeSelections(myCase);
    const allSelected = isAllPlaintiffEvidenceSelected(myCase);
    return caseInProgress && !allSelected;
}

function canSelectDefendantEvidence(myCase) {
    const caseInProgress = isCaseStatusMakeSelections(myCase);
    const allSelected = isAllDefendantEvidenceSelected(myCase);
    return caseInProgress && !allSelected;
}

function cloneCase(myCase) {
    return {
        _id: myCase._id,
        name: myCase.name,
        closedDate: myCase.closedDate,
        openedDate: myCase.openedDate,
        status: myCase.status,
        isDefendantGuilty: myCase.isDefendantGuilty,
        issue: myCase.issue,
        witnesses: myCase.witnesses,
        judgeName: myCase.judgeName,
        plaintiffName: myCase.plaintiffName,
        defendantName: myCase.defendantName,
        witnessName2: myCase.witnessName2,
        witnessName3: myCase.witnessName3,
        witnessName4: myCase.witnessName4,
        witnessName5: myCase.witnessName5,
    };
}

function populateDefendantEvidence(myCase, fullCase) {
    const defendantPoolValues = [];
    myCase.defendantEvidencePool.forEach((evIndex) => {
        const myEv = myCase.defendantEvidenceValues[evIndex];
        defendantPoolValues.push({
            name: myEv,
            id: evIndex
        });
    });

    const defendantSelectedValues = [];
    myCase.defendantEvidenceSelected.forEach((evIndex) => {
        const myEv = myCase.defendantEvidenceValues[evIndex];
        defendantSelectedValues.push({
            name: myEv,
            id: evIndex
        });
    });

    const defendantCourtValues = [];
    myCase.defendantEvidenceCourt.forEach((evIndex) => {
        const myEv = myCase.defendantEvidenceValues[evIndex];
        defendantCourtValues.push({
            name: myEv,
            id: evIndex
        });
    });

    fullCase.defendantEvidencePool = defendantPoolValues;
    fullCase.defendantEvidenceSelected = defendantSelectedValues;
    fullCase.defendantEvidenceCourt = defendantCourtValues;
}

function populatePlaintiffValues(myCase, fullCase) {
    const plaintiffPoolValues = [];
    myCase.plaintiffEvidencePool.forEach((evIndex) => {
        const myEv = myCase.plaintiffEvidenceValues[evIndex];
        plaintiffPoolValues.push({
            name: myEv,
            id: evIndex
        });
    });

    const plaintiffSelectedValues = [];
    myCase.plaintiffEvidenceSelected.forEach((evIndex) => {
        const myEv = myCase.plaintiffEvidenceValues[evIndex];
        plaintiffSelectedValues.push({
            name: myEv,
            id: evIndex
        });
    });

    const plaintiffCourtValues = [];
    myCase.plaintiffEvidenceCourt.forEach((evIndex) => {
        const myEv = myCase.plaintiffEvidenceValues[evIndex];
        plaintiffCourtValues.push({
            name: myEv,
            id: evIndex
        });
    });

    fullCase.plaintiffEvidencePool = plaintiffPoolValues;
    fullCase.plaintifEvidenceSelected = plaintiffSelectedValues;
    fullCase.plaintiffEvidenceCourt = plaintiffCourtValues;
}

function populateValues(myCase) {
    const fullCase = cloneCase(myCase);
    populatePlaintiffValues(myCase, fullCase);
    populateDefendantEvidence(myCase, fullCase);
    return fullCase;
}

module.exports = {
    orderSortedCasesByDate,
    sortCasesByStatus,
    hasMaxWitnesses,
    addWitness,
    removeWitness,
    hasWitnessNameAlready,
    isCaseStatusAssignRoles,
    isCaseStatusOpeningArguments,
    isCaseStatusCrossfire,
    canRevealPlaintiffEvidence,
    canRevealDefendantEvidence,
    canSelectPlaintiffEvidence,
    canSelectDefendantEvidence,
    isCaseStatusVerdictSelection,
    getUnusedCaseName,
    canLockRoles,
    areSelectionsComplete,
    canMakeVerdict,
    populateValues
}
