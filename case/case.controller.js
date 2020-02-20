const express = require('express');
const caseController = express.Router();
const caseManager = require('./case.manager');

caseController.get('/', (req, res) => {
  caseManager.getAllCases()
    .then((cases) => {
      res.send(cases);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.get('/random', (req, res) => {
  caseManager.getRandomCase()
    .then((randomCase) => {
      res.send(randomCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = caseController;