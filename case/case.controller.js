const express = require('express');
const caseController = express.Router();
const caseManager = require('./case.manager');
const mailer = require('../utilities/mailer.util');
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

caseController.get('/open', (req, res) => {
  caseManager.getAllCases()
    .then((cases) => {
      res.send(cases.openCases);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.get('/closed', (req, res) => {
  caseManager.getAllCases()
    .then((cases) => {
      res.send(cases.closedCases);
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
  caseManager.makeCaseAutomatic()
    .then((addedCase) => {
      const caseName = addedCase.name;
      const message = `<p>The Case Of <strong>${caseName}</strong> was opened.</p>`;
      mailer.sendEmail("adamontheinternet.com@gmail.com", "CASE OPENED", message);
      res.send(addedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/judgeName', (req, res) => {
  const judgeName = req.body.judgeName;
  const caseId = req.body.caseId;
  caseManager.assignJudgeName(judgeName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/defendantName', (req, res) => {
  const defendantName = req.body.defendantName;
  const caseId = req.body.caseId;
  caseManager.assignDefendantName(defendantName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/plaintiffName', (req, res) => {
  const plaintiffName = req.body.plaintiffName;
  const caseId = req.body.caseId;
  caseManager.assignPlaintiffName(plaintiffName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/witnessName', (req, res) => {
  const witnessName = req.body.witnessName;
  const caseId = req.body.caseId;
  caseManager.addWitnessName(witnessName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/start', (req, res) => {
  const caseId = req.body.caseId;
  caseManager.startCase(caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/close', (req, res) => {
  const caseId = req.body.caseId;
  const isDefendantGuilty = req.body.isDefendantGuilty;
  caseManager.closeCase(caseId, isDefendantGuilty)
    .then((updatedCase) => {
      const caseName = updatedCase.name;
      const verdict = updatedCase.isDefendantGuilty ? "GUILTY" : "NOT GUILTY";
      const message = `<p>The Case Of <strong>${caseName}</strong> was closed.</p><p>The defendant was <strong>${verdict}</strong>.</p>`;
      mailer.sendEmail("adamontheinternet.com@gmail.com", "CASE CLOSED", message);
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