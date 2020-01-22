const express = require('express');
const doodadController = express.Router();
const {
  getAllDoodads,
  getDoodadById,
  addDoodad,
  editDoodad,
  deleteOneDoodad
} = require("./doodad.manager");

doodadController.get('/', (req, res) => {
  getAllDoodads()
  .then((doodads) => {
    res.send(doodads);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

doodadController.get('/:id', (req, res) => {
  const id = req.params.id;
  getDoodadById(id)
  .then((doodad) => {
    res.send(doodad);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

doodadController.post('/', (req, res) => {
  const doodad = req.body;
  addDoodad(doodad)
    .then((addedDoodad) => {
      res.send(addedDoodad);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

doodadController.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteOneDoodad(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

doodadController.put('/', (req, res) => {
  const doodad = req.body;
  editDoodad(doodad)
    .then((editedDoodad) => {
      res.send(editedDoodad);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = doodadController;