const express = require('express');
const caseController = express.Router();
const caseManager = require('./case.manager');
const caseStatusManager = require('./caseStatus.manager');
const caseEvidenceManager = require('./caseEvidence.manager');
const caseNameManager = require('./caseNames.manager');
const mailer = require('../utilities/mailer.util');
const authUtil = require('../utilities/auth.util');
const boolUtil = require('../utilities/bool.util');
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

caseController.put('/judgeName/:id', (req, res) => {
  const judgeName = req.body.name;
  const id = req.params.id;
  caseNameManager.assignJudgeName(judgeName, id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/removeJudgeName/:id', (req, res) => {
  const id = req.params.id;
  caseNameManager.removeJudgeName(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/defendantName/:id', (req, res) => {
  const defendantName = req.body.name;
  const id = req.params.id;
  caseNameManager.assignDefendantName(defendantName, id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/removeDefendantName/:id', (req, res) => {
  const id = req.params.id;
  caseNameManager.removeDefendantName(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/plaintiffName/:id', (req, res) => {
  const plaintiffName = req.body.name;
  const id = req.params.id;
  caseNameManager.assignPlaintiffName(plaintiffName, id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/removePlaintiffName/:id', (req, res) => {
  const id = req.params.id;
  caseNameManager.removePlaintiffName(id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/witnessName/:id', (req, res) => {
  const witnessName = req.body.name;
  const id = req.params.id;
  caseNameManager.addWitnessName(witnessName, id)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/removeWitnessName/:id', (req, res) => {
  const witnessName = req.body.name;
  const id = req.params.id;
  caseNameManager.removeWitnessName(witnessName, id)
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

  if (boolUtil.stringHasBooleanValue(isDefendantGuiltyString)) {
    const isDefendantGuilty = boolUtil.translateBooleanString(isDefendantGuiltyString);

    caseStatusManager.makeVerdict(id, isDefendantGuilty)
        .then((updatedCase) => {
          const caseName = updatedCase.name;
          const verdict = updatedCase.isDefendantGuilty ? "GUILTY" : "NOT GUILTY";
          const messageIntro = `Order in the Court! The Case of the ${caseName} has been closed.`;
          const messageVerdict = `The defendant ${updatedCase.defendantName} was found ${verdict}.`;
          const messageArchive = `Details in the Case Archive: https://order-in-the-court-app.herokuapp.com/archived-case/${updatedCase._id}`;
          let closingMessage = `${messageIntro} ${messageVerdict} ${messageArchive}`;
          mailer.sendEmail("adamontheinternet.com@gmail.com", "CASE CLOSED", closingMessage);
          tweetManager.makeTweet(closingMessage);
          res.send(updatedCase);
        })
        .catch((err) => {
          res.statusCode = 500;
          res.send(err);
        });
  } else {
    res.statusCode = 500;
    res.send("Internal Error");
  }
});

caseController.put('/selectPlaintiffEvidence/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = Number(req.params.evidenceId);
  caseEvidenceManager.selectEvidence(caseId, evidenceId, true)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/selectDefendantEvidence/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = Number(req.params.evidenceId);
  caseEvidenceManager.selectEvidence(caseId, evidenceId, false)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/revealPlaintiffEvidence/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = Number(req.params.evidenceId);
  caseEvidenceManager.revealEvidence(caseId, evidenceId, true)
    .then((updatedCase) => {
      res.send(updatedCase);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

caseController.put('/revealDefendantEvidence/:caseId/evidence/:evidenceId', (req, res) => {
  const caseId = req.params.caseId;
  const evidenceId = Number(req.params.evidenceId);
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