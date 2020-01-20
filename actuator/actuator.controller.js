const express = require('express');
const actuatorController = express.Router();
const {
  getHealth
} = require("./actuator.manager");

actuatorController.get('/health', (req, res) => {
  const health = getHealth();
  res.send(health);
});

module.exports = actuatorController;