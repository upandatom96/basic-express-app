const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const boolUtil = require('../utilities/bool.util');
const caseUtil = require('./case-helper.util');

function selectWitness(caseId, witnessIndex, witnessNumber) {
    return new Promise((resolve, reject) => {
        const hasCaseId = boolUtil.hasValue(caseId);
        const hasWitnessIndex = boolUtil.hasValue(witnessIndex);
        if (!hasCaseId || !hasWitnessIndex) {
            reject("Case id and witness index required.");
        } else {
            Case.findOne({ _id: caseId })
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (!caseUtil.canSelectWitness(foundCase, witnessNumber)) {
                        reject({
                            message: `CANNOT SELECT WITNESS ${witnessNumber}`
                        });
                    } else {
                        let witnessIsSelectable;
                        if (witnessNumber === 1) {
                            witnessIsSelectable = foundCase.witnessPool1.includes(witnessIndex);
                        } else if (witnessNumber === 2) {
                            witnessIsSelectable = foundCase.witnessPool2.includes(witnessIndex);
                        } else if (witnessNumber === 3) {
                            witnessIsSelectable = foundCase.witnessPool3.includes(witnessIndex);
                        } else if (witnessNumber === 4) {
                            witnessIsSelectable = foundCase.witnessPool4.includes(witnessIndex);
                        } else if (witnessNumber === 5) {
                            witnessIsSelectable = foundCase.witnessPool5.includes(witnessIndex);
                        }

                        if (!witnessIsSelectable) {
                            reject({
                                message: 'FAILED TO SELECT'
                            });
                        } else {
                            if (witnessNumber === 1) {
                                foundCase.selectedWitness1 = witnessIndex;
                                foundCase.witnessPool1 = foundCase.witnessPool1.filter((witness) => {
                                    return witness != witnessIndex;
                                })
                            } else if (witnessNumber === 2) {
                                foundCase.selectedWitness2 = witnessIndex;
                                foundCase.witnessPool2 = foundCase.witnessPool2.filter((witness) => {
                                    return witness != witnessIndex;
                                })
                            } else if (witnessNumber === 3) {
                                foundCase.selectedWitness3 = witnessIndex;
                                foundCase.witnessPool3 = foundCase.witnessPool3.filter((witness) => {
                                    return witness != witnessIndex;
                                })
                            } else if (witnessNumber === 4) {
                                foundCase.selectedWitness4 = witnessIndex;
                                foundCase.witnessPool4 = foundCase.witnessPool4.filter((witness) => {
                                    return witness != witnessIndex;
                                })
                            } else if (witnessNumber === 5) {
                                foundCase.selectedWitness1 = witnessIndex;
                                foundCase.witnessPool5 = foundCase.witnessPool5.filter((witness) => {
                                    return witness != witnessIndex;
                                })
                            }
                            foundCase.save()
                                .then((updatedCase) => {
                                    resolve(updatedCase);
                                });
                        }
                    }
                });
        }
    });
}

module.exports = {
    selectWitness
}
