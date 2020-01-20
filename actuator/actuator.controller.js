const express = require('express');
const actuatorController = express.Router();
const {
  getHealth,
  getInfo
} = require("./actuator.manager");

actuatorController.get('/health', (req, res) => {
  const health = getHealth();
  res.send(health);
});

actuatorController.get('/info', (req, res) => {
  const info = getInfo();
  res.send(info);
});

module.exports = actuatorController;