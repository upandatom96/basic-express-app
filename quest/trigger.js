const BoolUtil = require("../utilities/bool.util");

function triggersActivated(triggers, hero) {
    const noTriggers = areNoTriggers(triggers);
    if (noTriggers) {
        return true;
    }

    const statReqsMet = areStatReqsMet(triggers, hero);

    const specialReqsMet = areSpecialReqsMet(triggers, hero);

    return statReqsMet && specialReqsMet;
}

module.exports = {
    triggersActivated
}

function checkStatReq(req, stat) {
    return BoolUtil.hasNoValue(req) || stat >= req;
}

function areStatReqsMet(triggers, hero) {
    const strengthMet = checkStatReq(triggers.strengthReq, hero.strength);
    const wisdomMet = checkStatReq(triggers.wisdomReq, hero.wisdom);
    const charismaMet = checkStatReq(triggers.charismaReq, hero.charisma);
    const dexterityMet = checkStatReq(triggers.dexterityReq, hero.dexterity);

    return strengthMet && wisdomMet && charismaMet && dexterityMet;
}

function checkSpecialReq(reqAttributeList, specialAttribute) {
    const noReq = BoolUtil.hasNoValue(reqAttributeList) || reqAttributeList.level === 0;
    if (noReq) {
        return true;
    }
    return reqAttributeList.some((advantageReq) => {
        return advantageReq === specialAttribute;
    });
}

function areSpecialReqsMet(triggers, hero) {
    const advantageMet = checkSpecialReq(triggers.advantageReq, hero.advantage);
    const disadvantageMet = checkSpecialReq(triggers.disadvantageReq, hero.disadvantage);
    const itemMet = checkSpecialReq(triggers.itemReq, hero.item);
    const allyMet = checkSpecialReq(triggers.allyReq, hero.ally);

    return advantageMet && disadvantageMet && itemMet && allyMet;
}

function areNoTriggers(triggers) {
    return BoolUtil.hasNoValue(triggers);
}
