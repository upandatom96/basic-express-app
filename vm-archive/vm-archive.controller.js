const express = require('express');
const controller = express.Router();
const vmArchiveManager = require('./vm-archive.manager');
const tweetManager = require('../tweet/tweet.manager');

controller.get('/', async (req, res) => {
    try {
        const shows = await vmArchiveManager.getShows();
        res.send(shows);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

controller.get('/today', async (req, res) => {
    try {
        const shows = await vmArchiveManager.getShowsToday();
        tweetShow(req.query.tweet, shows);
        res.send(shows);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

controller.get('/act/:act', async (req, res) => {
    try {
        const act = req.params.act.replace("_", " ");
        const shows = await vmArchiveManager.getShowsForAct(act);
        res.send(shows);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

controller.get('/month/:month/date/:date', async (req, res) => {
    try {
        const date = Number(req.params.date);
        const month = Number(req.params.month) - 1;
        const shows = await vmArchiveManager.getShowsForDay(date, month);
        res.send(shows);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = controller;

function tweetShow(tweetParam, shows) {
    if (tweetParam && tweetParam.toUpperCase() === "TRUE") {
        if (shows.length > 0) {
            const tweet = vmArchiveManager.getTweetForShows(shows);
            tweetManager.makeVMTweet(tweet);
        }
    }
}
