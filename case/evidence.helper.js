function isAllEvidenceRevealed(myCase) {
    const revealedAllPE = isAllPlaintiffEvidenceRevealed(myCase);
    const revealedAllDE = isAllDefendantEvidenceRevealed(myCase);
    return revealedAllPE && revealedAllDE;
}

function isAllPlaintiffEvidenceRevealed(myCase) {
    return myCase.plaintiffEvidenceCourt.length >= 5;
}

function isAllDefendantEvidenceRevealed(myCase) {
    return myCase.defendantEvidenceCourt.length >= 5;
}

function isEvidenceRevealable(foundCase, isPlaintiff, evidenceIndex) {
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

module.exports = {
    isAllPlaintiffEvidenceRevealed,
    isAllDefendantEvidenceRevealed,
    isAllEvidenceRevealed,
    isEvidenceRevealable,
    revealEvidence
}
