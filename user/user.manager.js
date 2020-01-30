const mongoose = require('mongoose');
require('./User.model');
const User = mongoose.model('user');

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find({})
      .then((users) => {
        resolve(users);
      });
  });
}

module.exports = {
  getAllUsers
}
