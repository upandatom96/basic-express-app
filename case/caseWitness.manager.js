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
            Case.findOne({_id: caseId})
                .then((foundCase) => {
                    if (!foundCase) {
                        reject({
                            message: `Failed to find case`
                        });
                    } else if (!caseUtil.canSelectWitness(foundCase, witnessNumber)) {
                        reject({
                            message: `CANNOT SELECT WITNESS ${witnessNumber}`
                        });
                    } else if (!caseUtil.isWitnessSelectable(foundCase, witnessNumber, witnessIndex)) {
                        reject({
                            message: `WITNESS NOT SELECTABLE`
                        });
                    } else {
                        caseUtil.selectWitness(foundCase, witnessNumber, witnessIndex);

                        foundCase.save()
                            .then((updatedCase) => {
                                resolve(updatedCase);
                            });

                    }
                });
        }
    });
}

module.exports = {
    selectWitness
}
