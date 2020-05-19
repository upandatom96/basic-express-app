const caseConstants = require('./case.constants');
const timeUtil = require('../utilities/time.util');
const boolUtil = require('../utilities/bool.util');
const statusHelper = require('./case-status.helper');
const evidenceHelper = require('./evidence.helper');
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

function canMakeVerdict(myCase) {
    const revealedAllEvidence = isAllEvidenceRevealed(myCase);
    const statusReady = statusHelper.isClosingArguments(myCase) || statusHelper.isFreeTime(myCase);
    return revealedAllEvidence && statusReady;
}

function canLockRoles(myCase) {
    const namesSet = areEssentialNamesSet(myCase);
    const assigningRoles = statusHelper.isAssignRoles(myCase);
    return assigningRoles && namesSet;
}

function areSelectionsComplete(myCase) {
    const evidenceSelected = evidenceHelper.isAllEvidenceSelected(myCase);
    const witnessesSelected = witnessHelper.isAllWitnessesSelected(myCase);
    const makingSelections = statusHelper.isMakeSelections(myCase);
    return evidenceSelected && witnessesSelected && makingSelections;
}

function areEssentialNamesSet(myCase) {
    const hasJudgeName = boolUtil.hasValue(myCase.judgeName);
    const hasPName = boolUtil.hasValue(myCase.plaintiffName);
    const hasDName = boolUtil.hasValue(myCase.defendantName);
    return hasJudgeName && hasPName && hasDName;
}

module.exports = {
    isAssignRoles,
    isMakeSelections,
    isOpeningArguments,
    isCrossfire,
    isClosingArguments,
    isFreeTime,
    isVerdictSelection,
    isClosed,
    isLimbo,
    isInProgress,
    canLockRoles,
    areSelectionsComplete,
    canMakeVerdict
}