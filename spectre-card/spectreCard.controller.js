const express = require('express');
const spectreCardController = express.Router();
const {
  getAllSpectreCards,
  getAllSpectreDecks,
  getSpectreCardById,
  addSpectreCard,
  editSpectreCard,
  deleteOneSpectreCard
} = require("./spectreCard.manager");
const authUtil = require('../utilities/auth.util');

spectreCardController.get('/', (req, res) => {
  getAllSpectreCards()
    .then((spectreCards) => {
      res.send(spectreCards);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

spectreCardController.get('/decks', (req, res) => {
  getAllSpectreDecks()
    .then((spectreDecks) => {
      res.send(spectreDecks);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

spectreCardController.get('/:id', (req, res) => {
  const id = req.params.id;
  getSpectreCardById(id)
    .then((spectreCard) => {
      res.send(spectreCard);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

spectreCardController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const spectreCard = req.body;
  addSpectreCard(spectreCard)
    .then((addedSpectreCard) => {
      res.send(addedSpectreCard);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

spectreCardController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  deleteOneSpectreCard(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

spectreCardController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const spectreCard = req.body;
  editSpectreCard(spectreCard)
    .then((editedSpectreCard) => {
      res.send(editedSpectreCard);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = spectreCardController;