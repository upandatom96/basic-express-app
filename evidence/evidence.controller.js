const express = require('express');
const evidenceController = express.Router();
const evidenceManager = require("./evidence.manager");
const authUtil = require('../utilities/auth.util');

evidenceController.get('/', (req, res) => {
  evidenceManager.getAllEvidence()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

evidenceController.get('/random/:count', (req, res) => {
  const count = Number(req.params.count);
  evidenceManager.getRandomEvidence(count)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});


evidenceController.get('/:id', (req, res) => {
  const id = req.params.id;
  evidenceManager.getEvidenceById(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

evidenceController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const evidence = req.body;
  evidenceManager.addEvidence(evidence)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

evidenceController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  evidenceManager.deleteOneEvidence(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

evidenceController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const evidence = req.body;
  evidenceManager.editEvidence(evidence)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = evidenceController;