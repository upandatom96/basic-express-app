const bodyParser = require('body-parser');
const options = { extended: true };

function setupBodyParser(app) {
  app.use(bodyParser.urlencoded(options));
  app.use(bodyParser.json());
}

module.exports = {
  setupBodyParser
}