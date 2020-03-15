const express = require('express');
const logController = express.Router();
const logManager = require("./log.manager");
const authUtil = require('../utilities/auth.util');

logController.get('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  logManager.getAllLogs()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

logController.get('/:appName', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const appName = req.params.appName;
  logManager.getLogsByApp(appName)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

logController.post('/', (req, res) => {
  const log = req.body;
  logManager.addLog(log)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = logController;