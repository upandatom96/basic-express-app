function setupControllers(app) {
  app.get('/', (req, res) => {
    res.send({message: "basic-express-app is running"});
  });
  
  const actuatorController = require('./actuator/actuator.controller');
  app.use('/actuator', actuatorController);

  const widgetController = require('./widget/widget.controller');
  app.use('/widget', widgetController);
}

module.exports = {
  setupControllers
}