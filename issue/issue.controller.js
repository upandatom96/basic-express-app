const express = require('express');
const issueController = express.Router();
const issueManager = require("./issue.manager");
const authUtil = require('../utilities/auth.util');

issueController.get('/', (req, res) => {
  issueManager.getAllIssue()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

issueController.get('/random', (req, res) => {
  issueManager.getRandomIssue()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

issueController.get('/:id', (req, res) => {
  const id = req.params.id;
  issueManager.getIssueById(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

issueController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const issue = req.body;
  issueManager.addIssue(issue)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

issueController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  issueManager.deleteOneIssue(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

issueController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const issue = req.body;
  issueManager.editIssue(issue)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = issueController;