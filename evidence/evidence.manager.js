const mongoose = require('mongoose');
require('./Evidence.model');
const Evidence = mongoose.model('evidence');
const evidenceValidator = require('./evidence.validator');

function getAllEvidence() {
  return new Promise((resolve, reject) => {
    Evidence.find({})
      .then((evidence) => {
        resolve(evidence);
      });
  });
}

function getRandomEvidence(evidenceCount) {
  console.log("here");
  return new Promise((resolve, reject) => {
    Evidence.aggregate([{ $sample: { size: evidenceCount } }])
      .then((evidence) => {
        if (evidence) {
          resolve(evidence);
        } else {
          reject({
            message: "Failed to get evidence"
          });
        }
      });
  });
}

function getEvidenceById(id) {
  return new Promise((resolve, reject) => {
    Evidence.findOne({
      _id: id
    })
      .then((evidence) => {
        if (evidence) {
          resolve(evidence);
        } else {
          reject({
            message: "Failed to find evidence"
          });
        }
      });
  });
}

function addEvidence(evidence) {
  return new Promise((resolve, reject) => {
    const errors = evidenceValidator.checkForCreateErrors(evidence);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Evidence({
        name: evidence.name
      })
        .save()
        .then((evidence) => {
          resolve(evidence);
        });
    }
  });
}

function editEvidence(evidence) {
  return new Promise((resolve, reject) => {
    const errors = evidenceValidator.checkForEditErrors(evidence);
    if (errors.length > 0) {
      reject(errors);
    } else {
      const id = evidence._id;
      Evidence.findOne({
        _id: id
      })
        .then((foundEvidence) => {
          if (!foundEvidence) {
            reject({
              message: `Failed to find evidence`
            });
          } else {
            foundEvidence.name = evidence.name;

            foundEvidence.save()
              .then((response) => {
                resolve(response);
              });
          }
        });
    }
  });
}

function deleteOneEvidence(id) {
  return new Promise((resolve, reject) => {
    Evidence.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Evidence with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllEvidence,
  getEvidenceById,
  addEvidence,
  editEvidence,
  deleteOneEvidence,
  getRandomEvidence
}
