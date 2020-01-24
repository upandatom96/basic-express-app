const mongoose = require('mongoose');
require('./Doodad.model');
const Doodad = mongoose.model('doodad');
const doodadValidator = require('./doodad.validator');

function getAllDoodads() {
  return new Promise((resolve, reject) => {
    Doodad.find({})
      .then((doodads) => {
        resolve({
          doodads: doodads
        });
      });
  });
}

function getDoodadById(id) {
  return new Promise((resolve, reject) => {
    Doodad.findOne({
      _id: id
    })
      .then((doodad) => {
        if (doodad) {
          resolve(doodad);
        } else {
          reject({
            message: "Failed to find doodad"
          });
        }
      });
  });
}

function addDoodad(doodad) {
  return new Promise((resolve, reject) => {
    const errors = doodadValidator.checkForDoodadCreateErrors(doodad);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Doodad({
        name: doodad.name,
        type: doodad.type,
        description: doodad.description,
        age: doodad.age,
        used: doodad.used
      })
        .save()
        .then((resDoodad) => {
          resolve(resDoodad);
        });
    }
  });
}

function editDoodad(doodad) {
  return new Promise((resolve, reject) => {
    const errors = doodadValidator.checkForDoodadEditErrors(doodad);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    } else {
      const id = doodad._id;
      Doodad.findOne({
        _id: id
      })
        .then((foundDoodad) => {
          if (!foundDoodad) {
            reject({
              message: `Failed to find doodad`
            });
          } else {
            foundDoodad.name = doodad.name;
            foundDoodad.type = doodad.type;
            foundDoodad.description = doodad.description;
            foundDoodad.age = doodad.age;
            foundDoodad.used = doodad.used;

            foundDoodad.save()
              .then((editedDoodad) => {
                resolve(editedDoodad);
              });
          }
        });
    }
  });
}

function deleteOneDoodad(id) {
  return new Promise((resolve, reject) => {
    Doodad.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Doodad with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllDoodads,
  getDoodadById,
  addDoodad,
  editDoodad,
  deleteOneDoodad
}
