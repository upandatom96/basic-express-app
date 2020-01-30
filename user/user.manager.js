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

module.exports = {
  getAllUsers,
  registerUser
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
            resolve(`User ${registeredUser.name} successfully registered.`);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
}

