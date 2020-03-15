const mongoose = require('mongoose');
require('./Log.model');
const Log = mongoose.model('log');

function getAllLogs() {
  return new Promise((resolve, reject) => {
    Log.find({})
      .sort([['date', -1]])
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
      .sort([['date', -1]])
      .then((logs) => {
        resolve(logs);
      });
  });
}

function addLog(log) {
  return new Promise((resolve, reject) => {
    console.log(log.message);
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
