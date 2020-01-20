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
  return {
    widgets: [widgetOne, widgetTwo]
  };
}

function getWidgetById(id) {
  const widgetRequested = widgetOne;
  widgetRequested.id = id;
  return widgetRequested;
}

module.exports = {
  getAllWidgets,
  getWidgetById
}
