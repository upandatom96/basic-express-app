const randomManager = require('../random/random.manager');
const stringUtil = require('../utilities/string.util');
const boolUtil = require('../utilities/bool.util');
const caseConstants = require('./case.constants');

function buildCaseAttributes(allCases, randomIssue, randomWitnesses, randomEvidence, caseOptions) {
    const selectedCustomIssue = boolUtil.hasValue(caseOptions.customIssue);
    const issueText = selectedCustomIssue ? caseOptions.customIssue : randomIssue.name;
    const caseName = getUnusedCaseName(allCases);
    const witnessValues = getWitnessValues(randomWitnesses);
    const evidenceValues = getEvidenceValues(randomEvidence);

    return {
        name: caseName,
        issue: issueText,
        witnessValues: witnessValues,
        evidenceValues: evidenceValues,
        status: caseConstants.ASSIGN_ROLES,
        witnessPool1: caseConstants.WITNESS_POOL_1,
        witnessPool2: caseConstants.WITNESS_POOL_2,
        witnessPool3: caseConstants.WITNESS_POOL_3,
        witnessPool4: caseConstants.WITNESS_POOL_4,
        witnessPool5: caseConstants.WITNESS_POOL_5,
        plaintiffEvidencePool: caseConstants.PLAINTIFF_EVIDENCE_POOL,
        defendantEvidencePool: caseConstants.DEFENDANT_EVIDENCE_POOL,
    };
}

function getUnusedCaseName(allCases) {
    const oldNames = [];
    allCases.forEach((thisCase) => {
        oldNames.push(thisCase.name);
    });
    const caseName = randomManager.getNewPhrase(oldNames);
    return stringUtil.toTitleCase(caseName);
}

function getWitnessValues(witnesses) {
    const witnessValues = [];
    witnesses.forEach((witness) => {
        witnessValues.push(witness.name);
    });
    return witnessValues;
}

function getEvidenceValues(evidence) {
    const evidenceValues = [];
    evidence.forEach((ev) => {
        evidenceValues.push(ev.name);
    });
    return evidenceValues;
}

module.exports = {
    buildCaseAttributes
};
