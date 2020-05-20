const boolUtil = require('../utilities/bool.util');

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

function isAllWitnessesSelected(myCase) {
    const witness1Needed = myCase.witnessName1 !== null && myCase.selectedWitness1 === null;
    const witness2Needed = myCase.witnessName2 !== null && myCase.selectedWitness2 === null;
    const witness3Needed = myCase.witnessName3 !== null && myCase.selectedWitness3 === null;
    const witness4Needed = myCase.witnessName4 !== null && myCase.selectedWitness4 === null;
    const witness5Needed = myCase.witnessName5 !== null && myCase.selectedWitness5 === null;
    return !(witness1Needed && witness2Needed && witness3Needed && witness4Needed && witness5Needed);
}

function witnessAvailable(myCase, witnessNumber) {
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

function howManyWitnessesSelected(myCase) {
    return boolUtil.howManyHaveValue([
        myCase.selectedWitness1,
        myCase.selectedWitness2,
        myCase.selectedWitness3,
        myCase.selectedWitness4,
        myCase.selectedWitness5
    ]);
}

module.exports = {
    witnessAvailable,
    howManyWitnessesSelected,
    addWitness,
    removeWitness,
    hasWitnessNameAlready,
    selectWitness,
    isWitnessSelectable,
    isAllWitnessesSelected
}
