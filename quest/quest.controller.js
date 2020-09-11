const express = require('express');
const questController = express.Router();
const questNameManager = require("./quest-name.manager");
const questManager = require("./quest.manager");
const authUtil = require('../utilities/auth.util');

questController.get('/currentHero', async (req, res) => {
    try {
        const response = await questManager.getCurrentHero();
        res.send(response);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/heroes', async (req, res) => {
    try {
        const heroes = await questManager.getAllHeroes();
        res.send(heroes);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.post('/advanceCurrentHero', async (req, res) => {
    try {
        const message = await questManager.advanceCurrentHero();
        res.send(message);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.delete('/hero/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const response = await questManager.deleteHero(id);
        res.send(response);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/randomQuestName', async (req, res) => {
    try {
        const name = await questNameManager.getRandomQuestName();
        res.send(name);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

questController.get('/randomHeroName', async (req, res) => {
    try {
        const name = await questNameManager.getRandomHeroName();
        res.send(name);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = questController;
