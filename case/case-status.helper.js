const caseConstants = require('./case.constants');
const timeUtil = require('../utilities/time.util');
const boolUtil = require('../utilities/bool.util');
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
    const assigningRoles = isAssignRoles(myCase);
    return assigningRoles && namesSet;
}

function areSelectionsComplete(myCase) {
    const evidenceSelected = evidenceHelper.isAllEvidenceSelected(myCase);
    const witnessesSelected = witnessHelper.isAllWitnessesSelected(myCase);
    const makingSelections = isMakeSelections(myCase);
    return evidenceSelected && witnessesSelected && makingSelections;
}

function areEssentialNamesSet(myCase) {
    const hasJudgeName = boolUtil.hasValue(myCase.judgeName);
    const hasPName = boolUtil.hasValue(myCase.plaintiffName);
    const hasDName = boolUtil.hasValue(myCase.defendantName);
    return hasJudgeName && hasPName && hasDName;
}

function canRevealPlaintiffEvidence(myCase) {
    const caseInProgress = isInProgress(myCase);
    const allRevealed = evidenceHelper.isAllPlaintiffEvidenceRevealed(myCase);
    return caseInProgress && !allRevealed;
}

function canRevealDefendantEvidence(myCase) {
    const caseInProgress = isInProgress(myCase);
    const allSelected = evidenceHelper.isAllDefendantEvidenceRevealed(myCase);
    return caseInProgress && !allSelected;
}

function canSelectPlaintiffEvidence(myCase) {
    const caseInProgress = isMakeSelections(myCase);
    const allSelected = evidenceHelper.isAllPlaintiffEvidenceSelected(myCase);
    return caseInProgress && !allSelected;
}

function canSelectDefendantEvidence(myCase) {
    const caseInProgress = isMakeSelections(myCase);
    const allSelected = evidenceHelper.isAllDefendantEvidenceSelected(myCase);
    return caseInProgress && !allSelected;
}

function canSelectWitness(myCase, witnessNumber) {
    if (!statusHelper.isMakeSelections(myCase)) {
        return false;
    }
    if (witnessNumber === 1) {
        const playerPresent = myCase.witnessName1 !== null;
        const witnessNeeded = myCase.selectedWitness1 === null;
        return witnessNeeded && playerPresent;
    } else if (witnessNumber === 2) {
        const playerPresent = myCase.witnessName2 !== null;
        const witnessNeeded = myCase.selectedWitness2 === null;
        return witnessNeeded && playerPresent;
    } else if (witnessNumber === 3) {
        const playerPresent = myCase.witnessName3 !== null;
        const witnessNeeded = myCase.selectedWitness3 === null;
        return witnessNeeded && playerPresent;
    } else if (witnessNumber === 4) {
        const playerPresent = myCase.witnessName4 !== null;
        const witnessNeeded = myCase.selectedWitness4 === null;
        return witnessNeeded && playerPresent;
    } else if (witnessNumber === 5) {
        const playerPresent = myCase.witnessName5 !== null;
        const witnessNeeded = myCase.selectedWitness5 === null;
        return witnessNeeded && playerPresent;
    }
}

module.exports = {
    canSelectWitness,
    canSelectDefendantEvidence,
    canSelectPlaintiffEvidence,
    canRevealDefendantEvidence,
    canRevealPlaintiffEvidence,
    isAssignRoles,
    isMakeSelections,
    isOpeningArguments,
    isCrossfire,
    isClosingArguments,
    isFreeTime,
    isVerdictSelection,
    isClosed,
    isLimbo,
    canLockRoles,
    areSelectionsComplete,
    canMakeVerdict
}