function isAllEvidenceRevealed(myCase) {
    const revealedAllPE = isAllPlaintiffEvidenceRevealed(myCase);
    const revealedAllDE = isAllDefendantEvidenceRevealed(myCase);
    return revealedAllPE && revealedAllDE;
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
    isAllEvidenceRevealed,
    isAllEvidenceSelected,
    canRevealPlaintiffEvidence,
    canRevealDefendantEvidence,
    canSelectPlaintiffEvidence,
    canSelectDefendantEvidence,
    isEvidenceSelectable,
    isEvidenceRevealable,
    revealEvidence,
    selectEvidence,
}
