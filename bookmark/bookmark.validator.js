const boolUtil = require('../utilities/bool.util');

function checkForBookmarkCreateErrors(bookmark) {
  const errors = checkForGeneralBookmarkErrors(bookmark);
  if (boolUtil.hasValue(bookmark._id)) {
    errors.push({ text: 'New bookmark cannot have an id.' });
  }
  return errors;
}

function checkForBookmarkEditErrors(bookmark) {
  const errors = checkForGeneralBookmarkErrors(bookmark);
  if (boolUtil.hasNoValue(bookmark._id)) {
    errors.push({ text: 'Editing bookmark must have an id.' });
  }
  return errors;
}

function checkForGeneralBookmarkErrors(bookmark) {
  let errors = [];
  if (boolUtil.hasNoValue(bookmark.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoValue(bookmark.url)) {
    errors.push({ text: 'Please add a url' });
  }
  return errors;
}

module.exports = {
  checkForBookmarkEditErrors,
  checkForBookmarkCreateErrors
}