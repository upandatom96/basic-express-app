const express = require('express');
const questController = express.Router();
const questManager = require("./quest.manager");
const authUtil = require('../utilities/auth.util');

questController.get('/currentEpic', async (req, res) => {
    try {
        res.send("No current Epic");
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/epics', async (req, res) => {
    try {
        res.send([]);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.post('/advanceCurrentEpic', async (req, res) => {
    try {
        res.send("Advancing epic...");
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.delete('/epic/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        res.send("Deleting epic " + id + "...");
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/randomQuestName', async (req, res) => {
    try {
        const name = await questManager.getRandomQuestName();
        res.send(name);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/randomHeroName', async (req, res) => {
    try {
        const name = await questManager.getRandomHeroName();
        res.send(name);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = questController;
