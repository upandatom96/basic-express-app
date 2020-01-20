const express = require('express');

const app = express();

const { setupControllers } = require('./controller-setup');
setupControllers(app);

// run app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});