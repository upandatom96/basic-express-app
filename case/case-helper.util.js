const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const boolUtil = require('../utilities/bool.util');
const statusHelper = require('./case-status.helper');

function getUnusedCaseName(allCases) {
    const oldNames = [];
    allCases.forEach((thisCase) => {
        oldNames.push(thisCase.name);
    });
    const caseName = randomManager.getNewPhrase(oldNames);
    return stringUtil.toTitleCase(caseName);
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

function isAllEvidenceRevealed(myCase) {
    const revealedAllPE = isAllPlaintiffEvidenceRevealed(myCase);
    const revealedAllDE = isAllDefendantEvidenceRevealed(myCase);
    return revealedAllPE && revealedAllDE;
}

function canMakeVerdict(myCase) {
    const revealedAllEvidence = isAllEvidenceRevealed(myCase);
    const statusReady = statusHelper.isClosingArguments(myCase) || statusHelper.isFreeTime(myCase);
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
    const assigningRoles = statusHelper.isAssignRoles(myCase);
    return assigningRoles && namesSet;
}

function areSelectionsComplete(myCase) {
    const evidenceSelected = isAllEvidenceSelected(myCase);
    const witnessesSelected = isAllWitnessesSelected(myCase);
    const makingSelections = statusHelper.isMakeSelections(myCase);
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

function canRevealPlaintiffEvidence(myCase) {
    const caseInProgress = statusHelper.isInProgress(myCase);
    const allRevealed = isAllPlaintiffEvidenceRevealed(myCase);
    return caseInProgress && !allRevealed;
}

function canRevealDefendantEvidence(myCase) {
    const caseInProgress = statusHelper.isInProgress(myCase);
    const allSelected = isAllDefendantEvidenceRevealed(myCase);
    return caseInProgress && !allSelected;
}

function canSelectPlaintiffEvidence(myCase) {
    const caseInProgress = statusHelper.isMakeSelections(myCase);
    const allSelected = isAllPlaintiffEvidenceSelected(myCase);
    return caseInProgress && !allSelected;
}

function canSelectDefendantEvidence(myCase) {
    const caseInProgress = statusHelper.isMakeSelections(myCase);
    const allSelected = isAllDefendantEvidenceSelected(myCase);
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

function isWitnessSelectable(foundCase, witnessNumber, witnessIndex) {
    if (witnessNumber === 1) {
        return foundCase.witnessPool1.includes(witnessIndex);
    } else if (witnessNumber === 2) {
        return foundCase.witnessPool2.includes(witnessIndex);
    } else if (witnessNumber === 3) {
        return foundCase.witnessPool3.includes(witnessIndex);
    } else if (witnessNumber === 4) {
        return foundCase.witnessPool4.includes(witnessIndex);
    } else if (witnessNumber === 5) {
        return foundCase.witnessPool5.includes(witnessIndex);
    }
    return false;
}

function isEvidenceSelectable(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        return foundCase.plaintiffEvidencePool.includes(evidenceIndex);
    } else {
        return foundCase.defendantEvidencePool.includes(evidenceIndex);
    }
}

function isEvidenceRevealable(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        return foundCase.plaintiffEvidenceSelected.includes(evidenceIndex);
    } else {
        return foundCase.defendantEvidenceSelected.includes(evidenceIndex);
    }
}

function selectWitness(foundCase, witnessNumber, witnessIndex) {
    if (witnessNumber === 1) {
        foundCase.selectedWitness1 = witnessIndex;
        foundCase.witnessPool1 = foundCase.witnessPool1.filter((witness) => {
            return Number(witness) !== Number(witnessIndex);
        })
    } else if (witnessNumber === 2) {
        foundCase.selectedWitness2 = witnessIndex;
        foundCase.witnessPool2 = foundCase.witnessPool2.filter((witness) => {
            return Number(witness) !== Number(witnessIndex);
        })
    } else if (witnessNumber === 3) {
        foundCase.selectedWitness3 = witnessIndex;
        foundCase.witnessPool3 = foundCase.witnessPool3.filter((witness) => {
            return Number(witness) !== Number(witnessIndex);
        })
    } else if (witnessNumber === 4) {
        foundCase.selectedWitness4 = witnessIndex;
        foundCase.witnessPool4 = foundCase.witnessPool4.filter((witness) => {
            return Number(witness) !== Number(witnessIndex);
        })
    } else if (witnessNumber === 5) {
        foundCase.selectedWitness5 = witnessIndex;
        foundCase.witnessPool5 = foundCase.witnessPool5.filter((witness) => {
            return Number(witness) !== Number(witnessIndex);
        })
    }
}

function revealEvidence(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        foundCase.plaintiffEvidenceCourt.push(evidenceIndex);
        foundCase.plaintiffEvidenceSelected = foundCase.plaintiffEvidenceSelected.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    } else {
        foundCase.defendantEvidenceCourt.push(evidenceIndex);
        foundCase.defendantEvidenceSelected = foundCase.defendantEvidenceSelected.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    }
}

function selectEvidence(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        foundCase.plaintiffEvidenceSelected.push(evidenceIndex);
        foundCase.plaintiffEvidencePool = foundCase.plaintiffEvidencePool.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    } else {
        foundCase.defendantEvidenceSelected.push(evidenceIndex);
        foundCase.defendantEvidencePool = foundCase.defendantEvidencePool.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    }
}

module.exports = {
    isWitnessSelectable,
    isEvidenceSelectable,
    isEvidenceRevealable,
    selectWitness,
    revealEvidence,
    selectEvidence,
    addWitness,
    removeWitness,
    hasWitnessNameAlready,
    canSelectWitness,
    canRevealPlaintiffEvidence,
    canRevealDefendantEvidence,
    canSelectPlaintiffEvidence,
    canSelectDefendantEvidence,
    getUnusedCaseName,
    canLockRoles,
    areSelectionsComplete,
    canMakeVerdict
}
