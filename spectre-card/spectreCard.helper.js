function isTrap(spectreCard) {
  return spectreCard.deckType === "TRAP";
}

function isEncounter(spectreCard) {
  return spectreCard.deckType === "ENCOUNTER";
}

function isAnagrams(spectreCard) {
  return spectreCard.cardType === "ANAGRAMS";
}

function isOrders(spectreCard) {
  return spectreCard.cardType === "ORDERS";
}

function isThink(spectreCard) {
  return spectreCard.cardType === "THINK";
}

function isHunter(spectreCard) {
  return spectreCard.cardType === "HUNTER";
}

function isGenerator(spectreCard) {
  return spectreCard.cardType === "GENERATOR";
}

function isAct(spectreCard) {
  return spectreCard.cardSubType === "ACT";
}

function isDraw(spectreCard) {
  return spectreCard.cardSubType === "DRAW";
}

function isImpersonate(spectreCard) {
  return spectreCard.cardSubType === "IMPERSONATE";
}

module.exports = {
  isTrap,
  isEncounter,
  isAnagrams,
  isOrders,
  isThink,
  isHunter,
  isGenerator,
  isAct,
  isDraw,
  isImpersonate
}