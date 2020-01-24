const express = require('express');

const app = express();

// connect to mongoose
const mongoose = require('mongoose');
const { mongoURI } = require('./config/database.config');
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });

// body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { setupCors } = require('./cors-setup');
setupCors(app);

const { setupControllers } = require('./controller-setup');
setupControllers(app);

// run app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});