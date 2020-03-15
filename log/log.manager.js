const mongoose = require('mongoose');
require('./Log.model');
const Log = mongoose.model('log');

function getAllLogs() {
  return new Promise((resolve, reject) => {
    Log.find({})
      .then((logs) => {
        resolve(logs);
      });
  });
}

function getLogsByApp(appName) {
  return new Promise((resolve, reject) => {
    Log.find({
      application: appName
    })
      .then((logs) => {
        resolve(logs);
      });
  });
}

function addLog(log) {
  return new Promise((resolve, reject) => {
    new Log({
      message: log.message,
      level: log.level,
      application: log.application
    })
      .save()
      .then((log) => {
        resolve(log);
      });
  });
}

module.exports = {
  addLog,
  getAllLogs,
  getLogsByApp
}
