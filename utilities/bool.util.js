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

function allHaveValues(values) {
  return values.every((value) => {
    return hasValue(value);
  });
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

function stringHasBooleanValue(value) {
  return value.toLowerCase() === "true" || value.toLowerCase() === "false";
}

function translateBooleanString(value) {
  return value.toLowerCase() === "true";
}

module.exports = {
  hasBoolValue,
  hasNoBoolValue,
  hasNoValue,
  hasValue,
  allHaveValues,
  hasNumberValue,
  hasNoNumberValue,
  stringHasBooleanValue,
  translateBooleanString
}
