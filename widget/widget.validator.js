function checkForWidgetCreateErrors(widget) {
  const errors = checkForWidgetGeneralErrors(widget);
  if (widget._id) {
    errors.push({ text: 'New widget cannot have an id.' });
  }
  return errors;
}

function checkForWidgetEditErrors(widget) {
  const errors = checkForWidgetGeneralErrors(widget);
  if (!widget._id) {
    errors.push({ text: 'Editing widget must have an id.' });
  }
  return errors;
}

function checkForWidgetGeneralErrors(widget) {
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
  if (widget.used === null || widget.used === undefined || widget.used !== true && widget.used !== false) {
    errors.push({ text: 'Please add the used attribute' });
  }
  return errors;
}

module.exports = {
  checkForWidgetCreateErrors,
  checkForWidgetEditErrors
}
