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

function checkHasOne(reqAttributeList, heroAttributes) {
    const noReq = BoolUtil.hasNoValue(reqAttributeList) || reqAttributeList.level === 0;
    if (noReq) {
        return true;
    }
    return reqAttributeList.some((advantageReq) => {
        return heroAttributes.includes(advantageReq);
    });
}

function checkSpecialReq(reqAttributeList, heroAttribute) {
    const noReq = BoolUtil.hasNoValue(reqAttributeList) || reqAttributeList.level === 0;
    if (noReq) {
        return true;
    }
    return reqAttributeList.some((advantageReq) => {
        return advantageReq === heroAttribute;
    });
}

function areSpecialReqsMet(triggers, hero) {
    const advantageMet = checkSpecialReq(triggers.advantageReq, hero.advantage);
    const disadvantageMet = checkSpecialReq(triggers.disadvantageReq, hero.disadvantage);
    const itemMet = checkHasOne(triggers.itemReq, hero.inventory);
    if (itemMet && triggers.loseItem) {
        hero.inventory = hero.inventory.filter((item) => {
            return item !== triggers.itemReq;
        })
    }
    const allyMet = checkHasOne(triggers.allyReq, hero.party);
    if (allyMet && triggers.loseAlly) {
        hero.party = hero.party.filter((ally) => {
            return ally !== triggers.allyReq;
        })
    }
    return advantageMet && disadvantageMet && itemMet && allyMet;
}

function areNoTriggers(triggers) {
    return BoolUtil.hasNoValue(triggers);
}
