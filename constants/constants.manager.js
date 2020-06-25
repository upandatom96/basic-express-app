const WEAPONS = require('./clue/weapons');
const SCENES = require('./clue/scenes');
const CULPRITS = require('./clue/culprits');
const CLUE_BASES = require('./clue/clue-bases');
const TITLE_BASES = require('./clue/title-pieces');
const ANNOUNCEMENT_PIECES = require('./clue/announcement-pieces');

const NOUNS = require('./words/nouns');
const ADJECTIVES = require('./words/adjectives');

const STORY_PIECES = require('./story/story-pieces');

module.exports = {
    WEAPONS: WEAPONS.WEAPONS,
    SCENES: SCENES.SCENES,
    CULPRITS: CULPRITS.CULPRITS,
    CLUE_BASES: CLUE_BASES,
    TITLE_BASES: TITLE_BASES,
    NOUNS: NOUNS.NOUNS,
    ADJECTIVES: ADJECTIVES.ADJECTIVES,
    STORY_PIECES: STORY_PIECES,
    ANNOUNCEMENT_PIECES: ANNOUNCEMENT_PIECES,
}
