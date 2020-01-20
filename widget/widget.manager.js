const widgetOne = {
  id: "asf1231FASDF324",
  name: "widget One",
  type: "Hot Widget",
  description: "Your favorite widget",
  used: true
};

const widgetTwo = {
  id: "ffsfdf7987",
  name: "widget Two",
  type: "Cold Widget",
  description: "Your less favorite widget",
  used: false
};

function getAllWidgets() {
  return new Promise((resolve, reject) => {
    const widgets = {
      widgets: [widgetOne, widgetTwo]
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
    const errors = checkForWidgetCreateErrors(widget);
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
    const errors = checkForWidgetEditErrors(widget);
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

const checkForWidgetCreateErrors = ((widget) => {
  const errors = checkForWidgetErrors(widget);
  if (widget.id) {
    errors.push({ text: 'New widget cannot have an id.' });
  }
  return errors;
});

const checkForWidgetEditErrors = ((widget) => {
  const errors = checkForWidgetErrors(widget);
  if (!widget.id) {
    errors.push({ text: 'Editing widget must have an id.' });
  }
  return errors;
});

const checkForWidgetErrors = ((widget) => {
  let errors = [];
  if (!widget.name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!widget.type) {
    errors.push({ text: 'Please add a type' });
  }
  if (!widget.description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!widget.used || widget.used !== true && widget.used !== false) {
    errors.push({ text: 'Please add the used attribute' });
  }
  return errors;
});
