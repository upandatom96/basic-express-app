const { runningProd } = require('../utilities/env.util');

let mongoUser;
let mongoPass;
let mongoCluster;

const port = process.env.PORT || 5000;

if (runningProd) {
  mongoUser = process.env.MONGO_USER;
  mongoPass = process.env.MONGO_PASS;
  mongoCluster = process.env.MONGO_CLUSTER;
} else {
  try {
    const {
      MONGO_USER,
      MONGO_PASS,
      MONGO_CLUSTER,
    } = require("../local.env");

    mongoUser = MONGO_USER;
    mongoPass = MONGO_PASS;
    mongoCluster = MONGO_CLUSTER;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("Env setup incomplete");
    else
      throw e;
  }
}

module.exports = {
  mongoUser: mongoUser,
  mongoPass: mongoPass,
  mongoCluster: mongoCluster,
  port: port
};
