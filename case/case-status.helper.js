const caseConstants = require('./case.constants');
const timeUtil = require('../utilities/time.util');
const boolUtil = require('../utilities/bool.util');
const witnessHelper = require('./witness.helper');

function isAssignRoles(myCase) {
    return myCase.status === caseConstants.ASSIGN_ROLES;
}

function isMakeSelections(myCase) {
    return myCase.status === caseConstants.MAKE_SELECTIONS;
}

function isOpeningArguments(myCase) {
    return myCase.status === caseConstants.OPENING_ARGUMENTS;
}

function isCrossfire(myCase) {
    return myCase.status === caseConstants.CROSSFIRE;
}

function isClosingArguments(myCase) {
    return myCase.status === caseConstants.CLOSING_ARGUMENTS;
}

function isFreeTime(myCase) {
    return myCase.status === caseConstants.FREE_TIME;
}

function isVerdictSelection(myCase) {
    return myCase.status === caseConstants.VERDICT_SELECTION;
}

function isClosed(myCase) {
    return myCase.status === caseConstants.CASE_CLOSED;
}

function isOpen(myCase) {
    return !isClosed(myCase) && !isLimbo(myCase);
}

function isLimbo(myCase) {
    if (isClosed(myCase)) {
        return false;
    }
    return timeUtil.have24HoursPast(myCase.openedDate);
}

function isInProgress(myCase) {
    return isOpeningArguments(myCase) || isCrossfire(myCase) ||
        isClosingArguments(myCase) || isFreeTime(myCase);
}

function verdictIsNext(myCase) {
    return isClosingArguments(myCase) || isFreeTime(myCase);
}

function canLockRoles(myCase) {
    const namesSet = areEssentialNamesSet(myCase);
    const assigningRoles = isAssignRoles(myCase);
    return assigningRoles && namesSet;
}

function areEssentialNamesSet(myCase) {
    const hasJudgeName = boolUtil.hasValue(myCase.judgeName);
    const hasPName = boolUtil.hasValue(myCase.plaintiffName);
    const hasDName = boolUtil.hasValue(myCase.defendantName);
    return hasJudgeName && hasPName && hasDName;
}

function canSelectWitness(myCase, witnessNumber) {
    if (!isMakeSelections(myCase)) {
        return false;
    }
    return witnessHelper.witnessAvailable(myCase, witnessNumber);
}

module.exports = {
    verdictIsNext,
    canSelectWitness,
    isAssignRoles,
    isMakeSelections,
    isOpeningArguments,
    isCrossfire,
    isClosingArguments,
    isFreeTime,
    isInProgress,
    isVerdictSelection,
    isClosed,
    isLimbo,
    canLockRoles
}