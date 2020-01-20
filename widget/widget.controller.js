const express = require('express');
const widgetController = express.Router();
const {
  getAllWidgets,
  getWidgetById,
  addWidget,
  editWidget,
  deleteOneWidget
} = require("./widget.manager");

widgetController.get('/', (req, res) => {
  getAllWidgets()
  .then((widgets) => {
    res.send(widgets);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

widgetController.get('/:id', (req, res) => {
  const id = req.params.id;
  getWidgetById(id)
  .then((widget) => {
    res.send(widget);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

widgetController.post('/', (req, res) => {
  const widget = req.body;
  addWidget(widget)
    .then((addedWidget) => {
      res.send(addedWidget);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

widgetController.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteOneWidget(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

widgetController.put('/', (req, res) => {
  const widget = req.body;
  editWidget(widget)
    .then((editedWidget) => {
      res.send(editedWidget);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = widgetController;