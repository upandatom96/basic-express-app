function progressClue(clueBot) {
//    1. if status = 0, THE CRIME
//    2. if status = 1
//     A. if > 0 cards left, THE INVESTIGATION
//     B. if 0 cards left, THE REVEAL
    clueBot.status = 1;
    makeAnnouncement("Tweet");
    return clueBot;
}

module.exports = {
    progressClue
}

function makeAnnouncement(announcement) {
    console.log(announcement);
}
