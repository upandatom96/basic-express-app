const mailer = require('../utilities/mailer.util');
const tweetManager = require('../tweet/tweet.manager');
const logManager = require('../log/log.manager');

function handleAddedCase(addedCase) {
    const caseName = addedCase.name;
    const message = `<p>The Case Of <strong>${caseName}</strong> was opened.</p>`;
    const subject = "CASE OPENED";
    mailer.sendDefaultEmail(subject, message);
}

function createCaseClosingMessage(closedCase) {
    const caseName = closedCase.name;
    const verdict = closedCase.isDefendantGuilty ? "GUILTY" : "NOT GUILTY";
    const messageIntro = `Order in the Court! The Case of the ${caseName} has been closed.`;
    const messageVerdict = `The defendant ${closedCase.defendantName} was found ${verdict}.`;
    const archiveLink = `https://order-in-the-court-app.herokuapp.com/archived-case/${closedCase._id}`;
    const messageArchive = `Details in the Case Archive: ${archiveLink}`;
    return `${messageIntro} ${messageVerdict} ${messageArchive}`;
}

function handleClosedCase(closedCase) {
    const closingMessage = createCaseClosingMessage(closedCase);
    logManager.addLog(closingMessage);
    mailer.sendDefaultEmail("CASE CLOSED", closingMessage);
    tweetManager.makeTweet(closingMessage);
}

module.exports = {
    handleAddedCase,
    handleClosedCase
};
