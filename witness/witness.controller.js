const express = require('express');
const witnessController = express.Router();
const witnessManager = require("./witness.manager");
const authUtil = require('../utilities/auth.util');

witnessController.get('/', (req, res) => {
  witnessManager.getAllWitness()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

witnessController.get('/random/:count', (req, res) => {
  const count = Number(req.params.count);
  witnessManager.getRandomWitnesses(count)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

witnessController.get('/:id', (req, res) => {
  const id = req.params.id;
  witnessManager.getWitnessById(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

witnessController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const witness = req.body;
  witnessManager.addWitness(witness)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

witnessController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  witnessManager.deleteOneWitness(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

witnessController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const witness = req.body;
  witnessManager.editWitness(witness)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = witnessController;