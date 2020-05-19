const generalUtil = require('../utilities/general.util');

function populateWitnessPools(myCase, fullCase) {
    fullCase.witnessPool1 = generalUtil.translateIndicesToValues(myCase.witnessPool1, myCase.witnessValues);
    fullCase.witnessPool2 = generalUtil.translateIndicesToValues(myCase.witnessPool2, myCase.witnessValues);
    fullCase.witnessPool3 = generalUtil.translateIndicesToValues(myCase.witnessPool3, myCase.witnessValues);
    fullCase.witnessPool4 = generalUtil.translateIndicesToValues(myCase.witnessPool4, myCase.witnessValues);
    fullCase.witnessPool5 = generalUtil.translateIndicesToValues(myCase.witnessPool5, myCase.witnessValues);
    return fullCase;
}

function populateSelectedWitnesses(myCase, fullCase) {
    fullCase.selectedWitness1 = generalUtil.translateIndexToValue(myCase.selectedWitness1, myCase.witnessValues);
    fullCase.selectedWitness2 = generalUtil.translateIndexToValue(myCase.selectedWitness2, myCase.witnessValues);
    fullCase.selectedWitness3 = generalUtil.translateIndexToValue(myCase.selectedWitness3, myCase.witnessValues);
    fullCase.selectedWitness4 = generalUtil.translateIndexToValue(myCase.selectedWitness4, myCase.witnessValues);
    fullCase.selectedWitness5 = generalUtil.translateIndexToValue(myCase.selectedWitness5, myCase.witnessValues);
    return fullCase;
}

function populateWitnesses(myCase, fullCase) {
    fullCase = populateWitnessPools(myCase, fullCase);
    fullCase = populateSelectedWitnesses(myCase, fullCase);
    return fullCase;
}

module.exports = {
    populateWitnesses
};
