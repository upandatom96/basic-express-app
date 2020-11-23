const randomUtil = require('../utilities/random.util');

function chooseGoodVsEvil() {
    return randomUtil.pickRandom(["GOOD", "NEUTRAL", "EVIL"]);
}

function chooseLawVsChaos() {
    return randomUtil.pickRandom(["LAWFUL", "NEUTRAL", "CHAOTIC"]);
}

function getFullAlignment(goodVsEvil, lawVsChaos) {
    if (goodVsEvil === "NEUTRAL" && lawVsChaos === "NEUTRAL") {
        return "TRUE NEUTRAL";
    } else {
        return `${goodVsEvil} ${lawVsChaos}`;
    }
}

function chooseEnemyType() {
    return randomUtil.pickRandom(["GOBLIN", "TROLL", "ORC", "KOBOLD", "SPIRIT", "BEAST"]);
}

function chooseDemeanor() {
    return randomUtil.pickRandom(["FRIENDLY", "GRUMPY", "HELPFUL", "ABSENT-MINDED", "FOCUSED", "QUIET"]);
}

function rollStats() {
    let strength = 1;
    let wisdom = 1;
    let charisma = 1;
    let dexterity = 1;

    for (let i = 16; i > 0; i--) {
        const categoryNumber = randomUtil.pickRandomNumber(1, 4);
        switch (categoryNumber) {
            case 1:
                strength++;
                break;
            case 2:
                wisdom++;
                break;
            case 3:
                charisma++;
                break;
            case 4:
                dexterity++
                break;
        }
    }

    return {
        strength,
        wisdom,
        charisma,
        dexterity
    };
}

module.exports = {
    chooseGoodVsEvil,
    chooseLawVsChaos,
    getFullAlignment,
    rollStats,
    chooseEnemyType,
    chooseDemeanor,
}
