const express = require('express');
const { setupMongo } = require('./mongo-setup');
const { setupBodyParser } = require('./body-parser-setup');
const { setupCors } = require('./cors-setup');
const { setupControllers } = require('./controller-setup');
const { port } = require("./config/env.config");

setupMongo();

const app = express();
setupBodyParser(app);
setupCors(app);
setupControllers(app);

// setup session
const session = require('express-session');
const {secret} = require('./config/env.config');
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));

// setup passport
const passport = require('passport');
require('./config/passport.config')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});