const mongoose = require('mongoose');
require('./Application.model');
const Application = mongoose.model('application');
const applicationValidator = require('./application.validator');

function getAllApplications() {
  return new Promise((resolve, reject) => {
    Application.find({})
      .then((applications) => {
        resolve(applications);
      });
  });
}

function getApplicationById(id) {
  return new Promise((resolve, reject) => {
    Application.findOne({
      _id: id
    })
      .then((application) => {
        if (application) {
          resolve(application);
        } else {
          reject({
            message: "Failed to find application"
          });
        }
      });
  });
}

function addApplication(application) {
  return new Promise((resolve, reject) => {
    const errors = applicationValidator.checkForApplicationCreateErrors(application);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Application({
        name: application.name,
        link: application.link,
        description: application.description,
        icon: application.icon,
        status: application.status,
      })
        .save()
        .then((resApp) => {
          resolve(resApp);
        });
    }
  });
}

function editApplication(application) {
  return new Promise((resolve, reject) => {
    const errors = applicationValidator.checkForApplicationEditErrors(application);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    } else {
      const id = application._id;
      Application.findOne({
        _id: id
      })
        .then((foundApp) => {
          if (!foundApp) {
            reject({
              message: `Failed to find application`
            });
          } else {
            foundApp.name = application.name;
            foundApp.link = application.link;
            foundApp.description = application.description;
            foundApp.icon = application.icon;
            foundApp.status = application.status;

            foundApp.save()
              .then((editApp) => {
                resolve(editApp);
              });
          }
        });
    }
  });
}

function deleteOneApplication(id) {
  return new Promise((resolve, reject) => {
    Application.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Application with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllApplications,
  getApplicationById,
  addApplication,
  editApplication,
  deleteOneApplication
}
