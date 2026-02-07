export const WORDS = [
  { word: 'תפוח', emoji: '🍎', image: null },
  { word: 'כלב', emoji: '🐶', image: null },
  { word: 'בית', emoji: '🏠', image: null },
  { word: 'שמש', emoji: '☀️', image: null },
  { word: 'דג', emoji: '🐟', image: null },
  { word: 'פרח', emoji: '🌸', image: null },
  { word: 'ספר', emoji: '📖', image: null },
  { word: 'כוכב', emoji: '⭐', image: null },
  { word: 'ירח', emoji: '🌙', image: null },
  { word: 'עץ', emoji: '🌳', image: null },
  { word: 'חתול', emoji: '🐱', image: null },
  { word: 'ארנב', emoji: '🐰', image: null },
  { word: 'גלידה', emoji: '🍦', image: null },
  { word: 'כדור', emoji: '⚽', image: null },
  { word: 'מטוס', emoji: '✈️', image: null },
]

export const HEBREW_LETTERS = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט',
  'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ',
  'ק', 'ר', 'ש', 'ת',
]

// Final-form letters mapped to their base form
export const FINAL_TO_NORMAL = {
  'ך': 'כ',
  'ם': 'מ',
  'ן': 'נ',
  'ף': 'פ',
  'ץ': 'צ',
}

export function getFirstLetter(word) {
  return word[0]
}

export function getLastLetter(word) {
  const last = word[word.length - 1]
  // Map final forms to their normal letter for matching
  return FINAL_TO_NORMAL[last] || last
}

export function getRawLastLetter(word) {
  return word[word.length - 1]
}

// Opposites pairs: basic set
export const OPPOSITES_BASIC = [
  { a: 'גדול', emojiA: '🐘', b: 'קטן', emojiB: '🐜' },
  { a: 'חם', emojiA: '🔥', b: 'קר', emojiB: '🧊' },
  { a: 'שמח', emojiA: '😊', b: 'עצוב', emojiB: '😢' },
  { a: 'יום', emojiA: '☀️', b: 'לילה', emojiB: '🌙' },
  { a: 'למעלה', emojiA: '⬆️', b: 'למטה', emojiB: '⬇️' },
  { a: 'פתוח', emojiA: '📖', b: 'סגור', emojiB: '📕' },
]

// Opposites pairs: advanced set (harder/more abstract)
export const OPPOSITES_ADVANCED = [
  { a: 'מהר', emojiA: '🐇', b: 'לאט', emojiB: '🐢' },
  { a: 'ריק', emojiA: '🥛', b: 'מלא', emojiB: '🥤' },
  { a: 'כבד', emojiA: '🪨', b: 'קל', emojiB: '🪶' },
  { a: 'ישן', emojiA: '📜', b: 'חדש', emojiB: '✨' },
  { a: 'רך', emojiA: '🧸', b: 'קשה', emojiB: '💎' },
  { a: 'ארוך', emojiA: '🐍', b: 'קצר', emojiB: '🐛' },
]

// Syllable counter data: Hebrew words with syllable counts
export const SYLLABLE_WORDS = [
  { word: 'דג', emoji: '🐟', syllables: 1 },
  { word: 'יד', emoji: '✋', syllables: 1 },
  { word: 'פה', emoji: '👄', syllables: 1 },
  { word: 'כלב', emoji: '🐶', syllables: 2 },
  { word: 'בית', emoji: '🏠', syllables: 2 },
  { word: 'שמש', emoji: '☀️', syllables: 2 },
  { word: 'ספר', emoji: '📖', syllables: 2 },
  { word: 'תפוח', emoji: '🍎', syllables: 3 },
  { word: 'ארנב', emoji: '🐰', syllables: 2 },
  { word: 'גלידה', emoji: '🍦', syllables: 2 },
  { word: 'מטוס', emoji: '✈️', syllables: 2 },
  { word: 'פרפר', emoji: '🦋', syllables: 2 },
  { word: 'בננה', emoji: '🍌', syllables: 3 },
  { word: 'שוקולד', emoji: '🍫', syllables: 3 },
  { word: 'אופניים', emoji: '🚲', syllables: 3 },
  { word: 'טלוויזיה', emoji: '📺', syllables: 4 },
]

// Pattern completion data: color/shape sequences
export const PATTERN_COLORS = [
  { name: 'אדום', color: '#EF4444', emoji: '🔴' },
  { name: 'כחול', color: '#3B82F6', emoji: '🔵' },
  { name: 'ירוק', color: '#22C55E', emoji: '🟢' },
  { name: 'צהוב', color: '#EAB308', emoji: '🟡' },
  { name: 'סגול', color: '#A855F7', emoji: '🟣' },
  { name: 'כתום', color: '#F97316', emoji: '🟠' },
]

// English ABC Sounds: letter → word, emoji, color placeholder, TTS phrase
// A–E populated; F–Z are placeholders for now.
export const ALPHABET_DATA = {
  A: { word: 'Apple', emoji: '🍎', color: '#EF4444', ttsPhrase: "A is for Apple. A says Ah." },
  B: { word: 'Ball', emoji: '⚽', color: '#3B82F6', ttsPhrase: "B is for Ball. B says Buh." },
  C: { word: 'Cat', emoji: '🐱', color: '#F59E0B', ttsPhrase: "C is for Cat. C says Cuh." },
  D: { word: 'Dinosaur', emoji: '🦕', color: '#22C55E', ttsPhrase: "D is for Dinosaur. D says Duh!" },
  E: { word: 'Elephant', emoji: '🐘', color: '#8B5CF6', ttsPhrase: "E is for Elephant. E says Eh." },
  F: { word: 'Fish', emoji: '🐟', color: '#06B6D4', ttsPhrase: "F is for Fish. F says Fff." },
  G: { word: 'Grape', emoji: '🍇', color: '#7C3AED', ttsPhrase: "G is for Grape. G says Guh." },
  H: { word: 'Hat', emoji: '🎩', color: '#D97706', ttsPhrase: "H is for Hat. H says Hh." },
  I: { word: 'Igloo', emoji: '🏠', color: '#EC4899', ttsPhrase: "I is for Igloo. I says Ih." },
  J: { word: 'Jellyfish', emoji: '🪼', color: '#14B8A6', ttsPhrase: "J is for Jellyfish. J says Juh." },
  K: { word: 'Kite', emoji: '🪁', color: '#F43F5E', ttsPhrase: "K is for Kite. K says Kuh." },
  L: { word: 'Lion', emoji: '🦁', color: '#EAB308', ttsPhrase: "L is for Lion. L says Luh." },
  M: { word: 'Moon', emoji: '🌙', color: '#6366F1', ttsPhrase: "M is for Moon. M says Mmm." },
  N: { word: 'Nest', emoji: '🪺', color: '#84CC16', ttsPhrase: "N is for Nest. N says Nnn." },
  O: { word: 'Octopus', emoji: '🐙', color: '#F97316', ttsPhrase: "O is for Octopus. O says Ah." },
  P: { word: 'Penguin', emoji: '🐧', color: '#0EA5E9', ttsPhrase: "P is for Penguin. P says Puh." },
  Q: { word: 'Queen', emoji: '👸', color: '#A855F7', ttsPhrase: "Q is for Queen. Q says Kwu." },
  R: { word: 'Rainbow', emoji: '🌈', color: '#EF4444', ttsPhrase: "R is for Rainbow. R says Rrr." },
  S: { word: 'Star', emoji: '⭐', color: '#FBBF24', ttsPhrase: "S is for Star. S says Sss." },
  T: { word: 'Tree', emoji: '🌳', color: '#16A34A', ttsPhrase: "T is for Tree. T says Tuh." },
  U: { word: 'Umbrella', emoji: '☂️', color: '#7C3AED', ttsPhrase: "U is for Umbrella. U says Uh." },
  V: { word: 'Violin', emoji: '🎻', color: '#B45309', ttsPhrase: "V is for Violin. V says Vvv." },
  W: { word: 'Whale', emoji: '🐋', color: '#2563EB', ttsPhrase: "W is for Whale. W says Wuh." },
  X: { word: 'Fox', emoji: '🦊', color: '#DB2777', ttsPhrase: "X is for Fox. X says Ks." },
  Y: { word: 'Yarn', emoji: '🧶', color: '#EA580C', ttsPhrase: "Y is for Yarn. Y says Yuh." },
  Z: { word: 'Zebra', emoji: '🦓', color: '#171717', ttsPhrase: "Z is for Zebra. Z says Zzz." },
}
