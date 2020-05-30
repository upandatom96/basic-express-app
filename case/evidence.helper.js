function isAllEvidenceRevealed(myCase) {
    const revealedAllPE = isAllPlaintiffEvidenceRevealed(myCase);
    const revealedAllDE = isAllDefendantEvidenceRevealed(myCase);
    return revealedAllPE && revealedAllDE;
}

function isStartingEvidenceRevealed(myCase) {
    const revealedStartingPE = isStartingPlaintiffEvidenceRevealed(myCase);
    const revealedStartingDE = isStartingDefendantEvidenceRevealed(myCase);
    return revealedStartingPE && revealedStartingDE;
}

function isStartingPlaintiffEvidenceRevealed(myCase) {
    return myCase.plaintiffEvidenceCourt.length >= 1;
}

function isStartingDefendantEvidenceRevealed(myCase) {
    return myCase.defendantEvidenceCourt.length >= 1;
}

function isAllPlaintiffEvidenceRevealed(myCase) {
    return myCase.plaintiffEvidenceCourt.length >= 5;
}

function isAllDefendantEvidenceRevealed(myCase) {
    return myCase.defendantEvidenceCourt.length >= 5;
}

function isEvidenceInPool(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        return foundCase.plaintiffEvidencePool.includes(evidenceIndex);
    } else {
        return foundCase.defendantEvidencePool.includes(evidenceIndex);
    }
}

function revealEvidence(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        foundCase.plaintiffEvidenceCourt.push(evidenceIndex);
        foundCase.plaintiffEvidencePool = foundCase.plaintiffEvidencePool.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    } else {
        foundCase.defendantEvidenceCourt.push(evidenceIndex);
        foundCase.defendantEvidencePool = foundCase.defendantEvidencePool.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    }
}

function pickStartingEvidence(foundCase, isPlaintiff, evidenceIndex) {
    if (isPlaintiff) {
        foundCase.plaintiffEvidenceCourt.push(evidenceIndex);
        foundCase.defendantEvidencePool = foundCase.defendantEvidencePool.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    } else {
        foundCase.defendantEvidenceCourt.push(evidenceIndex);
        foundCase.plaintiffEvidencePool = foundCase.plaintiffEvidencePool.filter((evidence) => {
            return evidence !== evidenceIndex;
        });
    }
}

module.exports = {
    isStartingEvidenceRevealed,
    isAllPlaintiffEvidenceRevealed,
    isAllDefendantEvidenceRevealed,
    isStartingPlaintiffEvidenceRevealed,
    isStartingDefendantEvidenceRevealed,
    isEvidenceInPool,
    isAllEvidenceRevealed,
    revealEvidence,
    pickStartingEvidence
}
