const boolUtil = require('../utilities/bool.util');

function checkForWidgetCreateErrors(widget) {
  const errors = checkForWidgetGeneralErrors(widget);
  if (boolUtil.hasValue(widget._id)) {
    errors.push({ text: 'New widget cannot have an id.' });
  }
  return errors;
}

function checkForWidgetEditErrors(widget) {
  const errors = checkForWidgetGeneralErrors(widget);
  if (boolUtil.hasNoValue(widget._id)) {
    errors.push({ text: 'Editing widget must have an id.' });
  }
  return errors;
}

function checkForWidgetGeneralErrors(widget) {
  let errors = [];
  if (boolUtil.hasNoValue(widget.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoValue(widget.type)) {
    errors.push({ text: 'Please add a type' });
  }
  if (boolUtil.hasNoValue(widget.description)) {
    errors.push({ text: 'Please add a description' });
  }
  if (boolUtil.hasNoBoolValue(widget.used)) {
    errors.push({ text: 'Please add the used attribute' });
  }
  return errors;
}

module.exports = {
  checkForWidgetCreateErrors,
  checkForWidgetEditErrors
}
