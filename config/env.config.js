const { runningProd } = require('../utilities/env.util');

let mongoUser;
let mongoPass;
let mongoCluster;
let secret;
let sendgridApiKey;
let test;

const port = process.env.PORT || 5000;

if (runningProd) {
  mongoUser = process.env.MONGO_USER;
  mongoPass = process.env.MONGO_PASS;
  mongoCluster = process.env.MONGO_CLUSTER;
  secret = process.env.SECRET;
  sendgridApiKey = process.env.SENDGRID_API_KEY;
  twitConsumerKey = process.env.TWIT_CONSUMER_KEY;
  twitConsumerSecret = process.env.TWIT_CONSUMER_SECRET;
  twitAccessToken = process.env.TWIT_ACCESS_TOKEN;
  twitAccessTokenSecret = process.env.TWIT_ACCESS_TOKEN_SECRET;
  test = process.env.TEST;
} else {
  try {
    const {
      MONGO_USER,
      MONGO_PASS,
      MONGO_CLUSTER,
      SECRET,
      SENDGRID_API_KEY,
      TWIT_CONSUMER_KEY,
      TWIT_CONSUMER_SECRET,
      TWIT_ACCESS_TOKEN,
      TWIT_ACCESS_TOKEN_SECRET,
      TEST
    } = require("../local.env");

    mongoUser = MONGO_USER;
    mongoPass = MONGO_PASS;
    mongoCluster = MONGO_CLUSTER;
    secret = SECRET;
    sendgridApiKey = SENDGRID_API_KEY;
    twitConsumerKey = TWIT_CONSUMER_KEY;
    twitConsumerSecret = TWIT_CONSUMER_SECRET;
    twitAccessToken = TWIT_ACCESS_TOKEN;
    twitAccessTokenSecret = TWIT_ACCESS_TOKEN_SECRET;
    test = TEST;
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
  port: port,
  secret: secret,
  sendgridApiKey: sendgridApiKey,
  twitConsumerKey: twitConsumerKey,
  twitConsumerSecret: twitConsumerSecret,
  twitAccessToken: twitAccessToken,
  twitAccessTokenSecret: twitAccessTokenSecret,
  test: test
};
