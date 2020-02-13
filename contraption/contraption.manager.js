const mongoose = require('mongoose');
require('./Contraption.model');
const Contraption = mongoose.model('contraption');
const contraptionValidator = require('./contraption.validator');

function getAllContraptions() {
  return new Promise((resolve, reject) => {
    Contraption.find({})
      .then((contraptions) => {
        resolve({
          contraptions: contraptions
        });
      });
  });
}

function getContraptionById(id) {
  return new Promise((resolve, reject) => {
    Contraption.findOne({
      _id: id
    })
      .then((contraption) => {
        if (contraption) {
          resolve(contraption);
        } else {
          reject({
            message: "Failed to find contraption"
          });
        }
      });
  });
}

function addContraption(contraption) {
  return new Promise((resolve, reject) => {
    const errors = contraptionValidator.checkForContraptionCreateErrors(contraption);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Contraption({
        name: contraption.name,
        type: contraption.type,
        description: contraption.description,
        age: contraption.age,
        used: contraption.used
      })
        .save()
        .then((resContraption) => {
          resolve(resContraption);
        });
    }
  });
}

function editContraption(contraption) {
  return new Promise((resolve, reject) => {
    const errors = contraptionValidator.checkForContraptionEditErrors(contraption);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    } else {
      const id = contraption._id;
      Contraption.findOne({
        _id: id
      })
        .then((foundContraption) => {
          if (!foundContraption) {
            reject({
              message: `Failed to find contraption`
            });
          } else {
            foundContraption.name = contraption.name;
            foundContraption.type = contraption.type;
            foundContraption.description = contraption.description;
            foundContraption.age = contraption.age;
            foundContraption.used = contraption.used;

            foundContraption.save()
              .then((editedContraption) => {
                resolve(editedContraption);
              });
          }
        });
    }
  });
}

function deleteOneContraption(id) {
  return new Promise((resolve, reject) => {
    Contraption.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Contraption with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllContraptions,
  getContraptionById,
  addContraption,
  editContraption,
  deleteOneContraption
}
