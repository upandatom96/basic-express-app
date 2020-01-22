const { mongoUser, mongoPass, mongoCluster } = require('./env.config');

const mongoURI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}/test?retryWrites=true&w=majority`;

module.exports = {
  mongoURI: mongoURI
};
