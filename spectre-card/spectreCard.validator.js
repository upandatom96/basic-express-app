const boolUtil = require('../utilities/bool.util');
const cardHelper = require('./spectreCard.helper');

function checkForSpectreCardCreateErrors(spectreCard) {
  const errors = checkForGeneralSpectreCardErrors(spectreCard);
  if (boolUtil.hasValue(spectreCard._id)) {
    errors.push({ text: 'New spectreCard cannot have an id.' });
  }
  return errors;
}

function checkForSpectreCardEditErrors(spectreCard) {
  const errors = checkForGeneralSpectreCardErrors(spectreCard);
  if (boolUtil.hasNoValue(spectreCard._id)) {
    errors.push({ text: 'Editing spectreCard must have an id.' });
  }
  return errors;
}

function checkForGeneralSpectreCardErrors(spectreCard) {
  let errors = [];

  const isTrap = cardHelper.isTrap(spectreCard);
  const isEncounter = cardHelper.isEncounter(spectreCard);

  if (!isTrap && !isEncounter) {
    errors.push({ text: 'Please add a valid deck type' });
  }

  const isAnagrams = cardHelper.isAnagrams(spectreCard);
  const isOrders = cardHelper.isOrders(spectreCard);
  const isThink = cardHelper.isThink(spectreCard);
  const isHunter = cardHelper.isHunter(spectreCard);
  const isGenerator = cardHelper.isGenerator(spectreCard);

  if (!isAnagrams && !isOrders && !isThink && !isHunter && !isGenerator) {
    errors.push({ text: 'Please add a valid card type' });
  }

  const isAct = cardHelper.isAct(spectreCard);
  const isDraw = cardHelper.isDraw(spectreCard);
  const isImpersonate = cardHelper.isImpersonate(spectreCard);

  if (isOrders && (!isAct && !isDraw && !isImpersonate)) {
    errors.push({ text: 'Please add a valid card sub type for ORDERS' });
  }

  if (boolUtil.hasNoValue(spectreCard.valueOne)) {
    errors.push({ text: 'Please add a first value' });
  }
  const needsTwo = isOrders || isHunter || isGenerator;
  if (needsTwo && boolUtil.hasNoValue(spectreCard.valueTwo)) {
    errors.push({ text: 'Please add a second value' });
  }
  const needsThree = isOrders;
  if (needsThree && boolUtil.hasNoValue(spectreCard.valueThree)) {
    errors.push({ text: 'Please add a third value' });
  }
  return errors;
}

module.exports = {
  checkForSpectreCardEditErrors,
  checkForSpectreCardCreateErrors
}