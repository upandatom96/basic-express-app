const mongoose = require('mongoose');
const { mongoURI } = require('../config/database.config');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

function setupMongo() {
  mongoose.connect(mongoURI, options)
    .then(() => {
      console.log("mongodb connected...");
    })
    .catch((err) => {
      console.log("ERROR: " + err);
    });
}

module.exports = {
  setupMongo
}