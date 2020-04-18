const boolUtil = require('../utilities/bool.util');

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

  const isTrap = (spectreCard.deckType === "TRAP");
  const isEncounter = (spectreCard.deckType === "ENCOUNTER");

  if (!isTrap && !isEncounter) {
    errors.push({ text: 'Please add a valid deck type' });
  }

  const isAnagrams = (spectreCard.cardType === "ANAGRAMS");
  const isOrders = (spectreCard.cardType === "ORDERS");
  const isThink = (spectreCard.cardType === "THINK");
  const isHunter = (spectreCard.cardType === "HUNTER");
  const isGenerator = (spectreCard.cardType === "GENERATOR");

  if (!isAnagrams && !isOrders && !isThink && !isHunter && !isGenerator) {
    errors.push({ text: 'Please add a valid card type' });
  }

  const isAct = (spectreCard.cardSubType === "ACT");
  const isDraw = (spectreCard.cardSubType === "DRAW");
  const isImpersonate = (spectreCard.cardSubType === "IMPERSONATE");
  if (isOrders && (!isAct && !isDraw && !isImpersonate)) {
    errors.push({ text: 'Please add a valid card sub type for ORDERS' });
  }

  if (boolUtil.hasNoValue(spectreCard.valueOne)) {
    errors.push({ text: 'Please add a first value' });
  }
  const needsTwo = isThink || isHunter || isGenerator;
  if (needsTwo && boolUtil.hasNoValue(spectreCard.valueTwo)) {
    errors.push({ text: 'Please add a second value' });
  }
  const needsThree = isThink;
  if (needsThree && boolUtil.hasNoValue(spectreCard.valueThree)) {
    errors.push({ text: 'Please add a third value' });
  }
  return errors;
}

module.exports = {
  checkForSpectreCardEditErrors,
  checkForSpectreCardCreateErrors
}