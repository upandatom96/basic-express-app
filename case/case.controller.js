const express = require('express');
const caseController = express.Router();
const caseManager = require('./case.manager');
const authUtil = require('../utilities/auth.util');

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

caseController.get('/names', (req, res) => {
  caseManager.getAllCaseNames()
    .then((caseNames) => {
      res.send(caseNames);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.get('/:id', (req, res) => {
  const id = req.params.id;
  caseManager.getCaseById(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.post('/', (req, res) => {
  const caseOrder = req.body;
  caseOrder.evidenceCount = Number(caseOrder.evidenceCount);
  caseOrder.witnessCount = Number(caseOrder.witnessCount);
  caseManager.makeCase(caseOrder)
    .then((addedCase) => {
      res.send(addedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/judge', (req, res) => {
  const judgeCaseNotes = req.body;
  caseManager.updateJudgeCaseNotes(judgeCaseNotes)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/revealWitness/case/:caseId/witness/:witnessId', (req, res) => {
  const caseId = req.params.caseId;
  const witnessId = req.params.witnessId;
  caseManager.revealWitness(caseId, witnessId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/revealPlaintiffEvidence/case/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = req.params.evidenceId;
  caseManager.revealEvidence(caseId, evidenceId, true)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/revealDefendantEvidence/case/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = req.params.evidenceId;
  caseManager.revealEvidence(caseId, evidenceId, false)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  caseManager.deleteOneCase(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = caseController;