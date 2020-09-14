const CHAPTER_EVENTS = [
    {
        type: "SIMPLE",
        distanceMin: 9,
        distanceMax: 11,
        paths: [
            {
                triggers: {
                    strengthReq: 7,
                    wisdomReq: 0,
                    charismaReq: null,
                    dexterityReq: null,
                    abilityReq: [],
                    weaknessReq: null,
                    itemReq: null,
                    allyReq: null,
                },
                healMin: 0,
                healMax: 0,
                damageMin: 1,
                damageMax: 2,
                itemGain: null,
                allyGain: null,
                text: "|HERO| is strong enough to fight back."
            },
            {
                triggers: null,
                healMin: 0,
                healMax: 0,
                damageMin: 5,
                damageMax: 8,
                itemGain: null,
                allyGain: null,
                text: "|HERO| is too weak to fight back."
            }
        ],
    },
    // {
    //     code: "CE2",
    //     text: "A fairy enchants |HERO|.",
    //     type: "simple",
    //     halfDamageCondition: null,
    //     noDamageCondition: null,
    //     distanceMin: 9,
    //     distanceMax: 11,
    //     hpMin: 5,
    //     hpMax: 8,
    //     item: null,
    //     ally: null,
    // },
];

module.exports = {
    CHAPTER_EVENTS
}
