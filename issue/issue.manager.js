const mongoose = require('mongoose');
require('./Issue.model');
const Issue = mongoose.model('issue');
const issueValidator = require('./issue.validator');

function getAllIssue() {
  return new Promise((resolve, reject) => {
    Issue.find({})
      .then((issue) => {
        resolve(issue);
      });
  });
}

function getIssueById(id) {
  return new Promise((resolve, reject) => {
    Issue.findOne({
      _id: id
    })
      .then((issue) => {
        if (issue) {
          resolve(issue);
        } else {
          reject({
            message: "Failed to find issue"
          });
        }
      });
  });
}

function getRandomIssue() {
  return new Promise((resolve, reject) => {
    Issue.aggregate([{ $sample: { size: 1 } }])
      .then((issue) => {
        if (issue) {
          resolve(issue[0]);
        } else {
          reject({
            message: "Failed to get issue"
          });
        }
      });
  });
}

function addIssue(issue) {
  return new Promise((resolve, reject) => {
    const errors = issueValidator.checkForCreateErrors(issue);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Issue({
        name: issue.name,
        description: issue.description
      })
        .save()
        .then((issue) => {
          resolve(issue);
        });
    }
  });
}

function editIssue(issue) {
  return new Promise((resolve, reject) => {
    const errors = issueValidator.checkForEditErrors(issue);
    if (errors.length > 0) {
      reject(errors);
    } else {
      const id = issue._id;
      Issue.findOne({
        _id: id
      })
        .then((foundIssue) => {
          if (!foundIssue) {
            reject({
              message: `Failed to find issue`
            });
          } else {
            foundIssue.name = issue.name;
            foundIssue.description = issue.description;

            foundIssue.save()
              .then((response) => {
                resolve(response);
              });
          }
        });
    }
  });
}

function deleteOneIssue(id) {
  return new Promise((resolve, reject) => {
    Issue.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Issue with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllIssue,
  getIssueById,
  addIssue,
  editIssue,
  deleteOneIssue,
  getRandomIssue
}
