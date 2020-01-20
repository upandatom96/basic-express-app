const express = require('express');

const app = express();

// controller setup
app.get('/', (req, res) => {
  res.send({message: "basic-express-app is running"});
});
const actuatorController = require('./actuator/actuator.controller');
app.use('/actuator', actuatorController);

// run app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});