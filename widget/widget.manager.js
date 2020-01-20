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

module.exports = {
  getAllWidgets,
  getWidgetById
}
