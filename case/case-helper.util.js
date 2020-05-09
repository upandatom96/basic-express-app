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
        if (isCaseLimbo(myCase)) {
            sortedCases.limboCases.push(myCase);
        } else if (isCaseStatusClosed(myCase)) {
            sortedCases.closedCases.push(myCase);
        } else {
            sortedCases.openCases.push(myCase);
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
    // TODO test and use this
    return false;
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
    return myCase.unrevealedPlaintiffEvidence.length > 4;
}

function isAllDefendantEvidenceSelected(myCase) {
    return myCase.unrevealedDefendantEvidence.length > 4;
}

function isAllPlaintiffEvidenceRevealed(myCase) {
    return myCase.revealedPlaintiffEvidence.length > 4;
}

function isAllDefendantEvidenceRevealed(myCase) {
    return myCase.revealedDefendantEvidence.length > 4;
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

module.exports = {
    orderSortedCasesByDate,
    sortCasesByStatus,
    isCaseOpen,
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
    canMakeVerdict
}
