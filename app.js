const express = require('express');
const { setupMongo } = require('./mongo-setup');
const { setupBodyParser } = require('./body-parser-setup');
const { setupCors } = require('./cors-setup');
const { setupControllers } = require('./controller-setup');
const { setupAuth } = require('./auth-setup');
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