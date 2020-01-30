const express = require('express');
const { setupMongo } = require('./setup/mongo-setup');
const { setupBodyParser } = require('./setup/body-parser-setup');
const { setupCors } = require('./setup/cors-setup');
const { setupControllers } = require('./setup/controller-setup');
const { setupAuth } = require('./setup/auth-setup');
const { port } = require("./config/env.config");

setupMongo();

const app = express();
setupBodyParser(app);
setupCors(app);
setupControllers(app);
setupAuth(app);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});