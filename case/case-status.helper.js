const caseConstants = require('./case.constants');
const timeUtil = require('../utilities/time.util');

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

function getStatusText(myCase) {
    if (isAssignRoles(myCase)) {
        return "Role Assignment";
    } else if (isMakeSelections(myCase)) {
        return "Evidence & Witness Selection";
    } else if (isFreeTime(myCase)) {
        return "Open Trial";
    } else if (isOpeningArguments(myCase)) {
        return "Opening Arguments";
    } else if (isCrossfire(myCase)) {
        return "Crossfire Debate";
    } else if (isClosingArguments(myCase)) {
        return "Closing Arguments";
    } else if (isVerdictSelection(myCase)) {
        return "Final Ruling";
    } else if (isClosed(myCase)) {
        return "Case Closed";
    }
    return "CASE STATUS UNKNOWN";
}

module.exports = {
    verdictIsNext,
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
    getStatusText
}