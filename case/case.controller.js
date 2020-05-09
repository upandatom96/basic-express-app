const express = require('express');
const caseController = express.Router();
const caseManager = require('./case.manager');
const caseStatusManager = require('./caseStatus.manager');
const caseEvidenceManager = require('./caseEvidence.manager');
const caseNameManager = require('./caseNames.manager');
const mailer = require('../utilities/mailer.util');
const authUtil = require('../utilities/auth.util');
const tweetManager = require('../tweet/tweet.manager');

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

caseController.get('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  caseManager.getAllCases()
    .then((cases) => {
      res.send(cases);
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
  caseStatusManager.makeCaseAutomatic()
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
  caseNameManager.assignJudgeName(judgeName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.delete('/judgeName', (req, res) => {
  const caseId = req.body.caseId;
  caseNameManager.removeJudgeName(caseId)
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
  caseNameManager.assignDefendantName(defendantName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.delete('/defendantName', (req, res) => {
  const caseId = req.body.caseId;
  caseNameManager.removeDefendantName(caseId)
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
  caseNameManager.assignPlaintiffName(plaintiffName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.delete('/plaintiffName', (req, res) => {
  const caseId = req.body.caseId;
  caseNameManager.removePlaintiffName(caseId)
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
  caseNameManager.addWitnessName(witnessName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.delete('/witnessName', (req, res) => {
  const witnessName = req.body.witnessName;
  const caseId = req.body.caseId;
  caseNameManager.removeWitnessName(witnessName, caseId)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/lockRoles/:id', (req, res) => {
  const id = req.params.id;
  caseStatusManager.lockRoles(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/startFreeTime/:id', (req, res) => {
  const id = req.params.id;
  caseStatusManager.startFreeTime(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/startOpeningArguments/:id', (req, res) => {
  const id = req.params.id;
  caseStatusManager.startOpeningArguments(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/startCrossfire/:id', (req, res) => {
  const id = req.params.id;
  caseStatusManager.startCrossfire(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/startClosingArguments/:id', (req, res) => {
  const id = req.params.id;
  caseStatusManager.startClosingArguments(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/startVerdictSelection/:id', (req, res) => {
  const id = req.params.id;
  caseStatusManager.startVerdictSelection(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/makeVerdict/:id/:isDefendantGuiltyString', (req, res) => {
  const id = req.params.id;
  const isDefendantGuiltyString = req.params.isDefendantGuiltyString;
  const isDefendantGuilty = isDefendantGuiltyString.toLowerCase() === "true";

  caseStatusManager.makeVerdict(id, isDefendantGuilty)
    .then((updatedCase) => {
      const caseName = updatedCase.name;
      const verdict = updatedCase.isDefendantGuilty ? "GUILTY" : "NOT GUILTY";
      const message = `<p>The Case of the <strong>${caseName}</strong> was closed.</p><p>The defendant was <strong>${verdict}</strong>.</p>`;
      mailer.sendEmail("adamontheinternet.com@gmail.com", "CASE CLOSED", message);
      tweetManager.makeTweet(`Order in the Court! The Case of the ${caseName} has been closed. The defendant ${updatedCase.defendantName} was found ${verdict}. Details in the Case Archive: https://order-in-the-court-app.herokuapp.com/archived-case/${updatedCase._id}`);
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/selectPlaintiffEvidence/case/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = req.params.evidenceId;
  caseEvidenceManager.selectEvidence(caseId, evidenceId, true)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/selectDefendantEvidence/case/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = req.params.evidenceId;
  caseEvidenceManager.selectEvidence(caseId, evidenceId, false)
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
  caseEvidenceManager.revealEvidence(caseId, evidenceId, true)
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
  caseEvidenceManager.revealEvidence(caseId, evidenceId, false)
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