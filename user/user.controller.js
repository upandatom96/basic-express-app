const express = require('express');
const userController = express.Router();
const {
  getAllUsers
} = require("./user.manager");

userController.get('/', (req, res) => {
  getAllUsers()
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

module.exports = userController;