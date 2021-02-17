const express = require('express');
const controller = express.Router();
const manager = require("./superlative-scavenger.manager");

controller.get('', async (req, res) => {
    try {
        const mission = await manager.getOne();
        res.send(mission);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = controller;
