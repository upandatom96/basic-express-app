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

  const chitChatController = require('../chit-chat/chit-chit.controller');
  app.use('/chitChat', chitChatController);

  const clueBotController = require('../clue-bot/clue-bot.controller');
  app.use('/clueBot', clueBotController);

  const wordController = require('../word/word.controller');
  app.use('/word', wordController);

  const storyController = require('../stories/stories.controller');
  app.use('/story', storyController);

  const evidenceController = require('../evidence/evidence.controller');
  app.use('/evidence', evidenceController);

  const witnessController = require('../witness/witness.controller');
  app.use('/witness', witnessController);

  const issueController = require('../issue/issue.controller');
  app.use('/issue', issueController);

  const caseController = require('../case/case.controller');
  app.use('/case', caseController);

  const applicationController = require('../application/application.controller');
  app.use('/application', applicationController);

  const userController = require('../user/user.controller');
  app.use('/user', userController);

  const randomController = require('../random/random.controller');
  app.use('/random', randomController);

  const logController = require('../log/log.controller');
  app.use('/log', logController);

  const authController = require('../auth/auth.controller');
  app.use('/auth', authController);

  const bookmarkController = require('../bookmark/bookmark.controller');
  app.use('/bookmark', bookmarkController);

  const spectreCardController = require('../spectre-card/spectreCard.controller');
  app.use('/spectreCard', spectreCardController);

  const tweetController = require('../tweet/tweet.controller');
  app.use('/tweet', tweetController);

  const contactController = require('../contact/contact.controller');
  app.use('/contact', contactController);
}

module.exports = {
  setupControllers
}