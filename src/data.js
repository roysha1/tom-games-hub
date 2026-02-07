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
