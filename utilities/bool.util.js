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

function hasNoNumberValue(value) {
  return hasNoValue(value) || isNaN(value);
}

function hasNumberValue(value) {
  return !hasNoNumberValue(value);
}

function hasBoolValue(value) {
  return value === true || value === false;
}

function hasNoBoolValue(value) {
  return !hasBoolValue(value);
}

module.exports = {
  hasBoolValue,
  hasNoBoolValue,
  hasNoValue,
  hasValue,
  hasNumberValue,
  hasNoNumberValue
}
