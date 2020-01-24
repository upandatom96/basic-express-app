function checkForDoodadCreateErrors(doodad) {
  const errors = checkForGeneralDoodadErrors(doodad);
  if (doodad._id) {
    errors.push({ text: 'New doodad cannot have an id.' });
  }
  return errors;
}

function checkForDoodadEditErrors(doodad) {
  const errors = checkForGeneralDoodadErrors(doodad);
  if (!doodad._id) {
    errors.push({ text: 'Editing doodad must have an id.' });
  }
  return errors;
}

function checkForGeneralDoodadErrors(doodad) {
  let errors = [];
  if (!doodad.name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!doodad.type) {
    errors.push({ text: 'Please add a type' });
  }
  if (!doodad.description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!doodad.age) {
    errors.push({ text: 'Please add an age' });
  }
  if (doodad.used === null || doodad.used === undefined || doodad.used !== true && doodad.used !== false) {
    errors.push({ text: 'Please add the used attribute' });
  }
  return errors;
}

module.exports = {
  checkForDoodadEditErrors,
  checkForDoodadCreateErrors
}