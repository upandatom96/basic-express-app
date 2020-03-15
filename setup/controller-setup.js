function setupControllers(app) {
  app.get('/', (req, res) => {
    res.send({ message: "basic-express-app is running" });
  });

  const actuatorController = require('../actuator/actuator.controller');
  app.use('/actuator', actuatorController);

  const widgetController = require('../widget/widget.controller');
  app.use('/widget', widgetController);

  const doodadController = require('../doodad/doodad.controller');
  app.use('/doodad', doodadController);

  const contraptionController = require('../contraption/contraption.controller');
  app.use('/contraption', contraptionController);

  const evidenceController = require('../evidence/evidence.controller');
  app.use('/evidence', evidenceController);

  const witnessController = require('../witness/witness.controller');
  app.use('/witness', witnessController);

  const issueController = require('../issue/issue.controller');
  app.use('/issue', issueController);

  const caseController = require('../case/case.controller');
  app.use('/case', caseController);

  const userController = require('../user/user.controller');
  app.use('/user', userController);

  const logController = require('../log/log.controller');
  app.use('/log', logController);

  const authController = require('../auth/auth.controller');
  app.use('/auth', authController);
}

module.exports = {
  setupControllers
}