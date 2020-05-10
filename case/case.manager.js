const mongoose = require('mongoose');
require('./Case.model');
const Case = mongoose.model('case');

const caseUtil = require('./case-helper.util');

function getAllCases() {
  return new Promise((resolve, reject) => {
    Case.find({})
      .then((allCases) => {
        let sortedCases = caseUtil.sortCasesByStatus(allCases);
        sortedCases = caseUtil.orderSortedCasesByDate(sortedCases);
        resolve(sortedCases);
      });
  });
}

function getCaseById(id) {
  return new Promise((resolve, reject) => {
    Case.findOne({
      _id: id
    })
      .then((myCase) => {
        if (myCase) {
            const fullCase = caseUtil.populateValues(myCase);
          resolve(fullCase);
        } else {
          reject({
            message: "Failed to find case"
          });
        }
      });
  });
}

function deleteOneCase(id) {
  return new Promise((resolve, reject) => {
    Case.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Case with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllCases,
  getCaseById,
  deleteOneCase
}
