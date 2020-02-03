function isNull(value) {
  return value === null;
}

function isUndefined(value) {
  return value === undefined;
}

function isEmptyText(value) {
  return value === "";
}

function hasNoValue(value) {
  return isNull(value) || isUndefined(value) || isEmptyText(value);
}

function hasValue(value) {
  return !hasNoValue(value);
}

function hasBoolValue(value) {
  return value === true || value === false;
}

module.exports = {
  hasBoolValue,
  hasNoValue,
  hasValue
}
