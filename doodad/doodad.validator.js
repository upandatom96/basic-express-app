const boolUtil = require('../utilities/bool.util');

function checkForDoodadCreateErrors(doodad) {
  const errors = checkForGeneralDoodadErrors(doodad);
  if (boolUtil.hasValue(doodad._id)) {
    errors.push({ text: 'New doodad cannot have an id.' });
  }
  return errors;
}

function checkForDoodadEditErrors(doodad) {
  const errors = checkForGeneralDoodadErrors(doodad);
  if (boolUtil.hasNoValue(doodad._id)) {
    errors.push({ text: 'Editing doodad must have an id.' });
  }
  return errors;
}

function checkForGeneralDoodadErrors(doodad) {
  let errors = [];
  if (boolUtil.hasNoValue(doodad.name)) {
    errors.push({ text: 'Please add a name' });
  }
  if (boolUtil.hasNoValue(doodad.type)) {
    errors.push({ text: 'Please add a type' });
  }
  if (boolUtil.hasNoValue(doodad.description)) {
    errors.push({ text: 'Please add a description' });
  }
  if (boolUtil.hasNoValue(doodad.age)) {
    errors.push({ text: 'Please add an age' });
  }
  if (boolUtil.hasNoBoolValue(doodad.used)) {
    errors.push({ text: 'Please add the used attribute' });
  }
  return errors;
}

module.exports = {
  checkForDoodadEditErrors,
  checkForDoodadCreateErrors
}