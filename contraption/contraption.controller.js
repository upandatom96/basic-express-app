const express = require('express');
const contraptionController = express.Router();
const {
  getAllContraptions,
  getContraptionById,
  addContraption,
  editContraption,
  deleteOneContraption
} = require("./contraption.manager");
const authUtil = require('../utilities/auth.util');

contraptionController.get('/', (req, res) => {
  getAllContraptions()
    .then((contraptions) => {
      res.send(contraptions);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

contraptionController.get('/:id', (req, res) => {
  const id = req.params.id;
  getContraptionById(id)
    .then((contraption) => {
      res.send(contraption);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

contraptionController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const contraption = req.body;
  addContraption(contraption)
    .then((addedContraption) => {
      res.send(addedContraption);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

contraptionController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  deleteOneContraption(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

contraptionController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const contraption = req.body;
  editContraption(contraption)
    .then((editedContraption) => {
      res.send(editedContraption);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = contraptionController;