const mongoose = require('mongoose');
require('./SpectreCard.model');
const SpectreCard = mongoose.model('spectreCard');
const spectreCardValidator = require('./spectreCard.validator');
const randomUtil = require('../utilities/random.util');

function getAllSpectreCards() {
  return new Promise((resolve, reject) => {
    SpectreCard.find({})
      .then((spectreCards) => {
        resolve(spectreCards);
      });
  });
}

function getAllSpectreDecks() {
  return new Promise((resolve, reject) => {
    SpectreCard.find({})
      .then((spectreCards) => {

        spectreCards = randomUtil.shuffleArray(spectreCards);

        // traps
        const ordersDeck = [];
        const thinkDeck = [];
        const anagramsDeck = [];

        // encounters
        const hunterDeck = [];
        const generatorDeck = [];

        spectreCards.forEach((card) => {
          ordersDeck.push(card);
        });

        const decks = {
          ordersDeck,
          thinkDeck,
          anagramsDeck,
          hunterDeck,
          generatorDeck
        };

        resolve(decks);
      });
  });
}

function getSpectreCardById(id) {
  return new Promise((resolve, reject) => {
    SpectreCard.findOne({
      _id: id
    })
      .then((spectreCard) => {
        if (spectreCard) {
          resolve(spectreCard);
        } else {
          reject({
            message: "Failed to find spectre card"
          });
        }
      });
  });
}

function addSpectreCard(spectreCard) {
  return new Promise((resolve, reject) => {
    const errors = spectreCardValidator.checkForSpectreCardCreateErrors(spectreCard);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new SpectreCard({
        deckType: spectreCard.deckType,
        cardType: spectreCard.cardType,
        cardSubType: spectreCard.cardSubType,
        valueOne: spectreCard.valueOne,
        valueTwo: spectreCard.valueTwo,
        valueThree: spectreCard.valueThree
      })
        .save()
        .then((resSpectreCard) => {
          resolve(resSpectreCard);
        });
    }
  });
}

function editSpectreCard(spectreCard) {
  return new Promise((resolve, reject) => {
    const errors = spectreCardValidator.checkForSpectreCardEditErrors(spectreCard);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    } else {
      const id = spectreCard._id;
      SpectreCard.findOne({
        _id: id
      })
        .then((foundSpectreCard) => {
          if (!foundSpectreCard) {
            reject({
              message: `Failed to find spectre card`
            });
          } else {
            foundSpectreCard.deckType = spectreCard.deckType;
            foundSpectreCard.cardType = spectreCard.cardType;
            foundSpectreCard.cardSubType = spectreCard.cardSubType;
            foundSpectreCard.valueOne = spectreCard.valueOne;
            foundSpectreCard.valueTwo = spectreCard.valueTwo;
            foundSpectreCard.valueThree = spectreCard.valueThree;

            foundSpectreCard.save()
              .then((editedSpectreCard) => {
                resolve(editedSpectreCard);
              });
          }
        });
    }
  });
}

function deleteOneSpectreCard(id) {
  return new Promise((resolve, reject) => {
    SpectreCard.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Spectre Card with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllSpectreCards,
  getAllSpectreDecks,
  getSpectreCardById,
  addSpectreCard,
  editSpectreCard,
  deleteOneSpectreCard
}
