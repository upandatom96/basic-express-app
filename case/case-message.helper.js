const mailer = require('../utilities/mailer.util');
const tweetManager = require('../tweet/tweet.manager');

function handleAddedCase(addedCase) {
    const caseName = addedCase.name;
    const message = `<p>The Case Of <strong>${caseName}</strong> was opened.</p>`;
    const subject = "CASE OPENED";
    mailer.sendDefaultEmail(subject, message);
}

function handleClosedCase(closedCase) {
    const caseName = closedCase.name;
    const verdict = closedCase.isDefendantGuilty ? "GUILTY" : "NOT GUILTY";
    const messageIntro = `Order in the Court! The Case of the ${caseName} has been closed.`;
    const messageVerdict = `The defendant ${closedCase.defendantName} was found ${verdict}.`;
    const archiveLink = `https://order-in-the-court-app.herokuapp.com/archived-case/${closedCase._id}`;
    const messageArchive = `Details in the Case Archive: ${archiveLink}`;
    const closingMessage = `${messageIntro} ${messageVerdict} ${messageArchive}`;
    tweetManager.makeTweet(closingMessage);
    const subject = "CASE CLOSED";
    mailer.sendDefaultEmail(subject, closingMessage);
}

module.exports = {
    handleAddedCase,
    handleClosedCase
};
