import { describe, it, expect } from 'vitest'
import {
  WORDS, HEBREW_LETTERS, FINAL_TO_NORMAL,
  getFirstLetter, getLastLetter, getRawLastLetter,
  OPPOSITES_BASIC, OPPOSITES_ADVANCED,
  SYLLABLE_WORDS, PATTERN_COLORS,
  ALPHABET_DATA,
} from '../data'

describe('getFirstLetter', () => {
  it('returns the first character of a word', () => {
    expect(getFirstLetter('תפוח')).toBe('ת')
    expect(getFirstLetter('כלב')).toBe('כ')
    expect(getFirstLetter('דג')).toBe('ד')
  })
})

describe('getLastLetter', () => {
  it('returns the last letter normalized from final form', () => {
    // ארנב ends with ב (no final form)
    expect(getLastLetter('ארנב')).toBe('ב')
  })

  it('maps final-form letters to their normal form', () => {
    // A word ending in ם should map to מ
    expect(getLastLetter('אופניים')).toBe('מ')
    // A word ending in ן should map to נ (if such a word existed)
    expect(FINAL_TO_NORMAL['ן']).toBe('נ')
  })
})

describe('getRawLastLetter', () => {
  it('returns the raw last character without normalization', () => {
    expect(getRawLastLetter('ארנב')).toBe('ב')
    expect(getRawLastLetter('אופניים')).toBe('ם')
  })
})

describe('FINAL_TO_NORMAL', () => {
  it('has all 5 Hebrew final-form mappings', () => {
    expect(Object.keys(FINAL_TO_NORMAL)).toHaveLength(5)
    expect(FINAL_TO_NORMAL['ך']).toBe('כ')
    expect(FINAL_TO_NORMAL['ם']).toBe('מ')
    expect(FINAL_TO_NORMAL['ן']).toBe('נ')
    expect(FINAL_TO_NORMAL['ף']).toBe('פ')
    expect(FINAL_TO_NORMAL['ץ']).toBe('צ')
  })
})

describe('WORDS', () => {
  it('has at least 10 entries', () => {
    expect(WORDS.length).toBeGreaterThanOrEqual(10)
  })

  it('every entry has a non-empty word and emoji', () => {
    WORDS.forEach((w) => {
      expect(w.word).toBeTruthy()
      expect(w.emoji).toBeTruthy()
    })
  })
})

describe('HEBREW_LETTERS', () => {
  it('has 22 letters', () => {
    expect(HEBREW_LETTERS).toHaveLength(22)
  })

  it('starts with alef and ends with tav', () => {
    expect(HEBREW_LETTERS[0]).toBe('א')
    expect(HEBREW_LETTERS[21]).toBe('ת')
  })
})

describe('SYLLABLE_WORDS', () => {
  it('has at least 10 entries', () => {
    expect(SYLLABLE_WORDS.length).toBeGreaterThanOrEqual(10)
  })

  it('every entry has syllables in range 1-4', () => {
    SYLLABLE_WORDS.forEach((w) => {
      expect(w.syllables).toBeGreaterThanOrEqual(1)
      expect(w.syllables).toBeLessThanOrEqual(4)
    })
  })

  it('every entry has word and emoji', () => {
    SYLLABLE_WORDS.forEach((w) => {
      expect(w.word).toBeTruthy()
      expect(w.emoji).toBeTruthy()
    })
  })
})

describe('OPPOSITES_BASIC', () => {
  it('has 6 pairs', () => {
    expect(OPPOSITES_BASIC).toHaveLength(6)
  })

  it('every pair has a, b, emojiA, emojiB', () => {
    OPPOSITES_BASIC.forEach((p) => {
      expect(p.a).toBeTruthy()
      expect(p.b).toBeTruthy()
      expect(p.emojiA).toBeTruthy()
      expect(p.emojiB).toBeTruthy()
    })
  })
})

describe('OPPOSITES_ADVANCED', () => {
  it('has 6 pairs', () => {
    expect(OPPOSITES_ADVANCED).toHaveLength(6)
  })

  it('every pair has a, b, emojiA, emojiB', () => {
    OPPOSITES_ADVANCED.forEach((p) => {
      expect(p.a).toBeTruthy()
      expect(p.b).toBeTruthy()
      expect(p.emojiA).toBeTruthy()
      expect(p.emojiB).toBeTruthy()
    })
  })
})

describe('PATTERN_COLORS', () => {
  it('has 6 colors', () => {
    expect(PATTERN_COLORS).toHaveLength(6)
  })

  it('every entry has name, valid hex color, and emoji', () => {
    PATTERN_COLORS.forEach((c) => {
      expect(c.name).toBeTruthy()
      expect(c.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(c.emoji).toBeTruthy()
    })
  })
})

describe('ALPHABET_DATA', () => {
  it('has all 26 letters', () => {
    expect(Object.keys(ALPHABET_DATA)).toHaveLength(26)
  })

  it('every entry has word, emoji, color, and ttsPhrase', () => {
    Object.entries(ALPHABET_DATA).forEach(([letter, data]) => {
      expect(data.word).toBeTruthy()
      expect(data.emoji).toBeTruthy()
      expect(data.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(data.ttsPhrase).toContain(letter)
      expect(data.ttsPhrase).toContain(data.word)
    })
  })

  it('keys are uppercase A-Z', () => {
    const keys = Object.keys(ALPHABET_DATA)
    const expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    expect(keys).toEqual(expected)
  })
})
