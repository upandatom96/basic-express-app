const mongoose = require('mongoose');
require('./User.model');
const User = mongoose.model('user');
const userValidator = require('./user.validator');
const randomUtil = require('../utilities/random.util');
const bcrypt = require('bcryptjs');

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find({})
      .then((users) => {
        resolve(users);
      });
  });
}

function registerUser(user) {
  return new Promise((resolve, reject) => {
    const errors = userValidator.checkForUserRegistrationErrors(user);
    if (errors.length > 0) {
      reject(errors);
    } else {
      User.findOne({
        email: user.email
      })
        .then((userToRegister) => {
          if (userToRegister) {
            reject("Email already registered");
          }
          else {
            user.password = randomUtil.generateRandomPassword();
            runRegistration(user)
              .then((res) => {
                resolve({
                  message: res.message,
                  newPassword: user.password
                });
              })
              .catch((err) => {
                reject(err);
              });
          }
        });
    }
  });
}

function resetPasswordAutomatic(email) {
  const newPassword = randomUtil.generateRandomPassword();
  return updatePassword(email, newPassword);
}

function resetPasswordManual(email, newPassword, confirmNewPassword) {
  const errors = userValidator.comparePasswords(newPassword, confirmNewPassword);
  if (errors.length === 0) {
    return updatePassword(email, newPassword);
  } else {
    return Promise.reject(errors);
  }
}

function setToAdmin(email, isAdmin) {
  return new Promise((resolve, reject) => {
    User.findOne({
      email: email
    })
      .then((foundUser) => {
        if (!foundUser) {
          reject(`FAILURE: found no user ${email}`);
        } else {
          foundUser.admin = isAdmin;
          editUser(foundUser)
            .then((res) => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
  });
}

function resetEmail(oldId, newEmail) {
  return new Promise((resolve, reject) => {
    User.findOne({
      _id: oldId
    })
      .then((originalUser) => {
        console.log(9);
        if (!originalUser) {
          reject(`FAILURE: user ${oldId} not found`);
        } else {
          User.findOne({
            email: newEmail
          })
            .then((foundUserWithNewEmail) => {
              if (foundUserWithNewEmail) {
                reject(`FAILURE: user already exists with email ${newEmail}`);
              } else {
                originalUser.email = newEmail;
                editUser(originalUser)
                  .then((res) => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }
            });
        }
      });
  });
}

module.exports = {
  getAllUsers,
  registerUser,
  resetPasswordAutomatic,
  resetPasswordManual,
  resetEmail,
  setToAdmin
}

function runRegistration(user) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err)
          throw err;
        const newUser = new User({
          email: user.email,
          password: hash,
          admin: user.admin,
          specialAccess: user.specialAccess
        });
        newUser.save()
          .then((registeredUser) => {
            resolve(`User ${registeredUser.email} successfully registered.`);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
}

function editUser(user) {
  return new Promise((resolve, reject) => {
    user.save()
      .then((editedUserSaved) => {
        resolve(`User ${editedUserSaved.email} successfully edited.`);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updatePassword(email, newPassword) {
  return new Promise((resolve, reject) => {
    User.findOne({
      email: email
    })
      .then((foundUser) => {
        if (!foundUser) {
          reject(`FAILURE: no user found with email ${email}`);
        } else {
          submitPasswordUpdate(foundUser, newPassword)
            .then((res) => {
              resolve({
                newPassword: newPassword
              });
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
  });
}

function submitPasswordUpdate(user, newPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err)
          throw err;
        user.password = hash;
        user.save()
          .then((editedUser) => {
            resolve({
              message: `User ${editedUser.name} email.`,
              email: editedUser.email
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
}
