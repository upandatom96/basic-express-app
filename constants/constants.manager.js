const WEAPONS = require('./clue/weapons');
const SCENES = require('./clue/scenes');
const CULPRITS = require('./clue/culprits');
const CLUE_BASES = require('./clue/clue-bases');
const TITLE_BASES = require('./clue/title-pieces');
const ANNOUNCEMENT_PIECES = require('./clue/announcement-pieces');

const NOUNS = require('./words/nouns');
const ADJECTIVES = require('./words/adjectives');

const STORY_PIECES = require('./story/story-pieces');

const QUEST_PIECES = require('./quest/quest-pieces');
const QUEST_ABILITIES = require('./quest/quest-abilities');
const QUEST_QUESTS = require('./quest/quest-quests');
const QUEST_CHAPTER_EVENTS = require('./quest/quest-chapter-events');
const QUEST_FINALE_EVENTS = require('./quest/quest-finale-events');

module.exports = {
    WEAPONS: WEAPONS.WEAPONS,
    SCENES: SCENES.SCENES,
    CULPRITS: CULPRITS.CULPRITS,
    CLUE_BASES: CLUE_BASES,
    TITLE_BASES: TITLE_BASES,
    NOUNS: NOUNS.NOUNS,
    ADJECTIVES: ADJECTIVES.ADJECTIVES,
    STORY_PIECES: STORY_PIECES,
    QUEST_PIECES: QUEST_PIECES,
    QUEST_ABILITIES: QUEST_ABILITIES,
    QUEST_QUESTS: QUEST_QUESTS,
    QUEST_CHAPTER_EVENTS: QUEST_CHAPTER_EVENTS,
    QUEST_FINALE_EVENTS: QUEST_FINALE_EVENTS,
    ANNOUNCEMENT_PIECES: ANNOUNCEMENT_PIECES,
}
