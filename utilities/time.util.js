// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
function have24HoursPast(previousTime) {
    const currentTime = new Date();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const elapsed = currentTime - previousTime;

    const hoursPast = Math.round(elapsed / msPerHour);
    return hoursPast > 24;
}

module.exports = {
    have24HoursPast
}
