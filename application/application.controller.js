const express = require('express');
const applicationController = express.Router();
const {
  getAllApplications,
  getApplicationById,
  addApplication,
  editApplication,
  deleteOneApplication
} = require("./application.manager");
const authUtil = require('../utilities/auth.util');

applicationController.get('/', (req, res) => {
  getAllApplications()
    .then((apps) => {
      res.send(apps);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

applicationController.get('/:id', (req, res) => {
  const id = req.params.id;
  getApplicationById(id)
    .then((app) => {
      res.send(app);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

applicationController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const app = req.body;
  addApplication(app)
    .then((addedApp) => {
      res.send(addedApp);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

applicationController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  deleteOneApplication(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

applicationController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const app = req.body;
  editApplication(app)
    .then((editedApp) => {
      res.send(editedApp);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = applicationController;