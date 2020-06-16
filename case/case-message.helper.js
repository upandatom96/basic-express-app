const mailer = require('../utilities/mailer.util');
const tweetManager = require('../tweet/tweet.manager');
const logManager = require('../log/log.manager');

function handleStartedCase(startedCase) {
    const caseName = startedCase.name;
    const message = `<p>The Case Of <strong>${caseName}</strong> was started.</p>`;
    const subject = "CASE STARTED";
    mailer.sendDefaultEmail(subject, message);
}

function createCaseClosingMessage(closedCase) {
    const caseName = closedCase.name;
    const verdict = closedCase.isDefendantGuilty ? "GUILTY" : "NOT GUILTY";
    const messageIntro = `The Case of the ${caseName} has been closed.`;
    const messageVerdict = `The defendant was found ${verdict}.`;
    const archiveLink = `https://order-in-the-court-app.herokuapp.com/archived-case/${closedCase._id}`;
    const messageArchive = `Details in the Case Archive: ${archiveLink}`;
    return `${messageIntro} ${messageVerdict} ${messageArchive}`;
}

function handleClosedCase(closedCase) {
    const closingMessage = createCaseClosingMessage(closedCase);
    logManager.addLog(closingMessage);
    mailer.sendDefaultEmail("CASE CLOSED", closingMessage);
    if (!closedCase.isCustom) {
        tweetManager.makeOrderTweet(closingMessage);
    }
}

module.exports = {
    handleStartedCase,
    handleClosedCase
};
