const express = require('express');
const widgetController = express.Router();
const {
  getAllWidgets,
  getWidgetById
} = require("./widget.manager");

widgetController.get('/', (req, res) => {
  const widgets = getAllWidgets();
  res.send(widgets);
});

widgetController.get('/:id', (req, res) => {
  const id = req.params.id;
  const widgets = getWidgetById(id);
  res.send(widgets);
});

module.exports = widgetController;