const CULPRIT_CLUE_BASES = [
    `{CLUE1} and {CLUE2} were talking about the price of tea in China at the time of the murder.`,
    `Early in the night, before the murder, {CLUE1} and {CLUE2} were asleep.`,
    `At the time of the murder, {CLUE1} was singing a duet with {CLUE2}.`,
    `{CLUE1} and {CLUE2} were committing unrelated crimes at the time of the murder.`,
    `{CLUE1} and {CLUE2} were together all night.`,
    `Both {CLUE1} and {CLUE2} provided solid alibis.`,
    `{CLUE1} was dancing with {CLUE2} at the time of the murder.`,
    `While they are embarrassed to admit it, {CLUE} accidentally locked themselves in a closet all night.`,
    `You find that {CLUE} had no motive to commit the murder.`,
    `Although they were invited, {CLUE} never showed up to the party.`,
    `{CLUE} had too much to drink and passed out before the murder occurred.`,
];

const SCENE_CLUE_BASES = [
    `{CLUE1} and {CLUE2} were empty at the time of the murder.`,
    `{CLUE1} and {CLUE2} were being cleaned by several people at the time of the murder.`,
    `{CLUE1} and {CLUE2} were under surveillance at the time of the murder.`,
    `{CLUE1} and {CLUE2} were full of party-goers at the time of the murder.`,
    `Staff ensured that {CLUE1} and {CLUE2} were locked all night.`,
    `{CLUE} was closed for remodelling. Anyone who entered would have left some trace, as wet paint is everywhere.`,
    `{CLUE} was listed as a possible location for the murder, but such a place does not exist.`,
    `{CLUE} is a holy space not fit for murder.`,
    `Children were asleep in {CLUE} at the time of the murder. They did not wake up and are light sleepers.`,
    `{CLUE} would have been too obvious a place for a murder. You can rule that out.`,
    `{CLUE} was being guarded by a dog all night.`,
];

const WEAPON_CLUE_BASES = [
    `While they could have been deadly, {CLUE1} and {CLUE2} were locked away at the time of the murder.`,
    `{CLUE1} and {CLUE2} were being used by party-goers at the time of the murder. You don't want to ask how.`,
    `{CLUE1} and {CLUE2} were on display at the time of the murder.`,
    `{CLUE1} and {CLUE2} were being used by staff at the time of the murder.`,
    `{CLUE} was in plain sight all night long. Nobody could have taken it.`,
    `The dog was playing with {CLUE} all night.`,
    `You find no fingerprints on {CLUE}.`,
    `You investigate {CLUE} and realize it is simply a prop and could not have been used to commit murder.`,
];

module.exports = {
    SCENE_CLUE_BASES,
    WEAPON_CLUE_BASES,
    CULPRIT_CLUE_BASES
}
