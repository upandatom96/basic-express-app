const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { setupControllers } = require('./controller-setup');
setupControllers(app);

// run app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});