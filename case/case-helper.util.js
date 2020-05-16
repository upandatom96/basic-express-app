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
    const revealedAllPE = isAllPlaintiffEvidenceRevealed(myCase);
    const revealedAllDE = isAllDefendantEvidenceRevealed(myCase);
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

function hasWitnessNameAlready(myCase, witnessNumber) {
    if (witnessNumber === 1) {
        return myCase.witnessName1 !== null;
    } else if (witnessNumber === 2) {
        return myCase.witnessName2 !== null;
    } else if (witnessNumber === 3) {
        return myCase.witnessName3 !== null;
    } else if (witnessNumber === 4) {
        return myCase.witnessName4 !== null;
    } else if (witnessNumber === 5) {
        return myCase.witnessName5 !== null;
    }
    return false;
}

function addWitness(myCase, witnessName, witnessNumber) {
    if (witnessNumber === 1) {
        myCase.witnessName1 = witnessName;
    } else if (witnessNumber === 2) {
        myCase.witnessName2 = witnessName;
    } else if (witnessNumber === 3) {
        myCase.witnessName3 = witnessName;
    } else if (witnessNumber === 4) {
        myCase.witnessName4 = witnessName;
    } else if (witnessNumber === 5) {
        myCase.witnessName5 = witnessName;
    }
}

function removeWitness(myCase, witnessNumber) {
    if (witnessNumber === 1) {
        myCase.witnessName1 = null;
    } else if (witnessNumber === 2) {
        myCase.witnessName2 = null;
    } else if (witnessNumber === 3) {
        myCase.witnessName3 = null;
    } else if (witnessNumber === 4) {
        myCase.witnessName4 = null;
    } else if (witnessNumber === 5) {
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
    const witnessesSelected = isAllWitnessesSelected(myCase);
    const makingSelections = isCaseStatusMakeSelections(myCase);
    return evidenceSelected && witnessesSelected && makingSelections;
}

function isAllWitnessesSelected(myCase) {
    const witness1Needed = myCase.witnessName1 !== null && myCase.selectedWitness1 === null;
    const witness2Needed = myCase.witnessName2 !== null && myCase.selectedWitness2 === null;
    const witness3Needed = myCase.witnessName3 !== null && myCase.selectedWitness3 === null;
    const witness4Needed = myCase.witnessName4 !== null && myCase.selectedWitness4 === null;
    const witness5Needed = myCase.witnessName5 !== null && myCase.selectedWitness5 === null;
    return !(witness1Needed && witness2Needed && witness3Needed && witness4Needed && witness5Needed);
}

function isAllPlaintiffEvidenceSelected(myCase) {
    return myCase.plaintiffEvidenceSelected.length >= 10;
}

function isAllDefendantEvidenceSelected(myCase) {
    return myCase.defendantEvidenceSelected.length >= 10;
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

function canSelectWitness(myCase, witnessNumber) {
    if (!isCaseStatusMakeSelections(myCase)) {
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

function cloneCase(myCase) {
    return {
        _id: myCase._id,
        name: myCase.name,
        closedDate: myCase.closedDate,
        openedDate: myCase.openedDate,
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

function populateDefendantEvidence(myCase, fullCase) {
    const defendantPoolValues = [];
    myCase.defendantEvidencePool.forEach((evIndex) => {
        const myEv = myCase.evidenceValues[evIndex];
        defendantPoolValues.push({
            name: myEv,
            _id: evIndex
        });
    });

    const defendantSelectedValues = [];
    myCase.defendantEvidenceSelected.forEach((evIndex) => {
        const myEv = myCase.evidenceValues[evIndex];
        defendantSelectedValues.push({
            name: myEv,
            _id: evIndex
        });
    });

    const defendantCourtValues = [];
    myCase.defendantEvidenceCourt.forEach((evIndex) => {
        const myEv = myCase.evidenceValues[evIndex];
        defendantCourtValues.push({
            name: myEv,
            _id: evIndex
        });
    });

    fullCase.defendantEvidencePool = defendantPoolValues;
    fullCase.defendantEvidenceSelected = defendantSelectedValues;
    fullCase.defendantEvidenceCourt = defendantCourtValues;
}

function populateWitnesses(myCase, fullCase) {
    const witnessPool1 = [];
    myCase.witnessPool1.forEach((witIndex) => {
        const myWit = myCase.witnessValues[witIndex];
        witnessPool1.push({
            name: myWit,
            _id: witIndex
        });
    });
    fullCase.witnessPool1 = witnessPool1;

    const witnessPool2 = [];
    myCase.witnessPool2.forEach((witIndex) => {
        const myWit = myCase.witnessValues[witIndex];
        witnessPool2.push({
            name: myWit,
            _id: witIndex
        });
    });
    fullCase.witnessPool2 = witnessPool2;

    const witnessPool3 = [];
    myCase.witnessPool3.forEach((witIndex) => {
        const myWit = myCase.witnessValues[witIndex];
        witnessPool3.push({
            name: myWit,
            _id: witIndex
        });
    });
    fullCase.witnessPool3 = witnessPool3;

    const witnessPool4 = [];
    myCase.witnessPool4.forEach((witIndex) => {
        const myWit = myCase.witnessValues[witIndex];
        witnessPool4.push({
            name: myWit,
            _id: witIndex
        });
    });
    fullCase.witnessPool4 = witnessPool4;

    const witnessPool5 = [];
    myCase.witnessPool5.forEach((witIndex) => {
        const myWit = myCase.witnessValues[witIndex];
        witnessPool5.push({
            name: myWit,
            _id: witIndex
        });
    });
    fullCase.witnessPool5 = witnessPool5;

    const witIndex1 = myCase.selectedWitness1;
    if (witIndex1) {
        const wit1 = myCase.witnessValues[witIndex1];
        fullCase.selectedWitness1 = {
            name: wit1,
            _id: witIndex1
        };
    } else {
        fullCase.selectedWitness1 = null;
    }

    const witIndex2 = myCase.selectedWitness2;
    if (witIndex2) {
        const wit2 = myCase.witnessValues[witIndex2];
        fullCase.selectedWitness2 = {
            name: wit2,
            _id: witIndex2
        };
    } else {
        fullCase.selectedWitness2 = null;
    }

    const witIndex3 = myCase.selectedWitness3;
    if (witIndex3) {
        const wit3 = myCase.witnessValues[witIndex3];
        fullCase.selectedWitness3 = {
            name: wit3,
            _id: witIndex3
        };
    } else {
        fullCase.selectedWitness3 = null;
    }

    const witIndex4 = myCase.selectedWitness4;
    if (witIndex4) {
        const wit4 = myCase.witnessValues[witIndex4];
        fullCase.selectedWitness4 = {
            name: wit4,
            _id: witIndex4
        };
    } else {
        fullCase.selectedWitness4 = null;
    }

    const witIndex5 = myCase.selectedWitness5;
    if (witIndex5) {
        const wit5 = myCase.witnessValues[witIndex5];
        fullCase.selectedWitness5 = {
            name: wit5,
            _id: witIndex5
        };
    } else {
        fullCase.selectedWitness5 = null;
    }
}

function populatePlaintiffEvidence(myCase, fullCase) {
    const plaintiffPoolValues = [];
    myCase.plaintiffEvidencePool.forEach((evIndex) => {
        const myEv = myCase.evidenceValues[evIndex];
        plaintiffPoolValues.push({
            name: myEv,
            _id: evIndex
        });
    });

    const plaintiffSelectedValues = [];
    myCase.plaintiffEvidenceSelected.forEach((evIndex) => {
        const myEv = myCase.evidenceValues[evIndex];
        plaintiffSelectedValues.push({
            name: myEv,
            _id: evIndex
        });
    });

    const plaintiffCourtValues = [];
    myCase.plaintiffEvidenceCourt.forEach((evIndex) => {
        const myEv = myCase.evidenceValues[evIndex];
        plaintiffCourtValues.push({
            name: myEv,
            _id: evIndex
        });
    });

    fullCase.plaintiffEvidencePool = plaintiffPoolValues;
    fullCase.plaintiffEvidenceSelected = plaintiffSelectedValues;
    fullCase.plaintiffEvidenceCourt = plaintiffCourtValues;
}

function populateValues(myCase) {
    const fullCase = cloneCase(myCase);
    populateWitnesses(myCase, fullCase);
    populatePlaintiffEvidence(myCase, fullCase);
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
    canSelectWitness,
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
