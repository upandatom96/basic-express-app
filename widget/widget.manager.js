const widgetValidator = require('./widget.validator');

const widgetOne = {
  _id: "asf1231FASDF324",
  name: "widget One",
  type: "Automatic Widget",
  description: "Your favorite widget",
  used: true,
  age: 5
};

const widgetTwo = {
  _id: "ffsfdf7987",
  name: "widget Two",
  type: "Diagonal Widget",
  description: "Your less favorite widget",
  used: false,
  age: 99
};

const widgetThree = {
  _id: "aaawerewrewr",
  name: "widget Three",
  type: "Spiral Widget",
  description: "You don't know this widget",
  used: false,
  age: 99
};

function getAllWidgets() {
  return new Promise((resolve, reject) => {
    const widgets = {
      widgets: [widgetOne, widgetTwo, widgetThree]
    };
    resolve(widgets);
  });
}

function getWidgetById(id) {
  return new Promise((resolve, reject) => {
    const widgetRequested = widgetOne;
    widgetRequested.id = id;
    resolve(widgetRequested);
  });
}

function addWidget(widget) {
  return new Promise((resolve, reject) => {
    const errors = widgetValidator.checkForWidgetCreateErrors(widget);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    }
    else {
      widget.id = "asdfwefaweftr879";
      resolve(widget);
    }
  });
}

function editWidget(widget) {
  return new Promise((resolve, reject) => {
    const errors = widgetValidator.checkForWidgetEditErrors(widget);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    }
    else {
      resolve(widget);
    }
  });
}

function deleteOneWidget(id) {
  return new Promise((resolve, reject) => {
    resolve({
      message: `Widget with id ${id} deleted or never existed`
    });
  });
}

module.exports = {
  getAllWidgets,
  getWidgetById,
  addWidget,
  editWidget,
  deleteOneWidget
}