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

caseController.post('/', (req, res) => {
  const caseOrder = req.body;
  caseManager.makeCase(caseOrder)
    .then((addedCase) => {
      res.send(addedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = caseController;