const express = require('express');
const controller = express.Router();
const vmArchiveManager = require('./vm-archive.manager');

controller.get('/', async (req, res) => {
    try {
        const shows = await vmArchiveManager.getShows();
        res.send(shows);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = controller;
