const mongoose = require('mongoose');
require('./Witness.model');
const Witness = mongoose.model('witness');
const witnessValidator = require('./witness.validator');

function getAllWitness() {
  return new Promise((resolve, reject) => {
    Witness.find({})
      .then((witness) => {
        resolve(witness);
      });
  });
}

function getWitnessById(id) {
  return new Promise((resolve, reject) => {
    Witness.findOne({
      _id: id
    })
      .then((witness) => {
        if (witness) {
          resolve(witness);
        } else {
          reject({
            message: "Failed to find witness"
          });
        }
      });
  });
}

function addWitness(witness) {
  return new Promise((resolve, reject) => {
    const errors = witnessValidator.checkForCreateErrors(witness);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Witness({
        name: witness.name
      })
        .save()
        .then((witness) => {
          resolve(witness);
        });
    }
  });
}

function editWitness(witness) {
  return new Promise((resolve, reject) => {
    const errors = witnessValidator.checkForEditErrors(witness);
    if (errors.length > 0) {
      reject(errors);
    } else {
      const id = witness._id;
      Witness.findOne({
        _id: id
      })
        .then((foundWitness) => {
          if (!foundWitness) {
            reject({
              message: `Failed to find witness`
            });
          } else {
            foundWitness.name = witness.name;

            foundWitness.save()
              .then((response) => {
                resolve(response);
              });
          }
        });
    }
  });
}

function deleteOneWitness(id) {
  return new Promise((resolve, reject) => {
    Witness.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Witness with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllWitness,
  getWitnessById,
  addWitness,
  editWitness,
  deleteOneWitness
}
