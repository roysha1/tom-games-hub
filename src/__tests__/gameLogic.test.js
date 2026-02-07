import { describe, it, expect } from 'vitest'
import {
  shuffleArray, pickLetterChoices,
  generateProblem, generateChoices,
  generatePattern,
} from '../utils'

describe('shuffleArray', () => {
  it('returns an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffleArray(arr)).toHaveLength(5)
  })

  it('contains the same elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('does not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const copy = [...arr]
    shuffleArray(arr)
    expect(arr).toEqual(copy)
  })

  it('handles empty array', () => {
    expect(shuffleArray([])).toEqual([])
  })

  it('handles single element', () => {
    expect(shuffleArray([42])).toEqual([42])
  })
})

describe('pickLetterChoices', () => {
  it('returns the default count of 6 choices', () => {
    const choices = pickLetterChoices('א')
    expect(choices).toHaveLength(6)
  })

  it('always includes the correct letter', () => {
    for (let i = 0; i < 20; i++) {
      const choices = pickLetterChoices('ב')
      expect(choices).toContain('ב')
    }
  })

  it('returns the specified count', () => {
    const choices = pickLetterChoices('ג', 4)
    expect(choices).toHaveLength(4)
  })

  it('contains only unique letters', () => {
    const choices = pickLetterChoices('ד')
    const unique = new Set(choices)
    expect(unique.size).toBe(choices.length)
  })
})

describe('generateProblem', () => {
  it('returns a valid problem object', () => {
    for (let i = 0; i < 50; i++) {
      const p = generateProblem()
      expect(p).toHaveProperty('a')
      expect(p).toHaveProperty('b')
      expect(p).toHaveProperty('op')
      expect(p).toHaveProperty('answer')
    }
  })

  it('operands and answer are within 0-10 range', () => {
    for (let i = 0; i < 50; i++) {
      const p = generateProblem()
      expect(p.a).toBeGreaterThanOrEqual(1)
      expect(p.a).toBeLessThanOrEqual(10)
      expect(p.b).toBeGreaterThanOrEqual(1)
      expect(p.b).toBeLessThanOrEqual(10)
      expect(p.answer).toBeGreaterThanOrEqual(0)
      expect(p.answer).toBeLessThanOrEqual(10)
    }
  })

  it('addition problems have correct answer', () => {
    for (let i = 0; i < 50; i++) {
      const p = generateProblem()
      if (p.op === '+') {
        expect(p.answer).toBe(p.a + p.b)
      }
    }
  })

  it('subtraction problems have correct answer', () => {
    for (let i = 0; i < 50; i++) {
      const p = generateProblem()
      if (p.op === '−') {
        expect(p.answer).toBe(p.a - p.b)
      }
    }
  })
})

describe('generateChoices', () => {
  it('returns exactly 4 choices', () => {
    expect(generateChoices(5)).toHaveLength(4)
  })

  it('always includes the correct answer', () => {
    for (let i = 0; i < 50; i++) {
      const correct = Math.floor(Math.random() * 11)
      const choices = generateChoices(correct)
      expect(choices).toContain(correct)
    }
  })

  it('all choices are unique', () => {
    for (let i = 0; i < 50; i++) {
      const choices = generateChoices(5)
      const unique = new Set(choices)
      expect(unique.size).toBe(4)
    }
  })

  it('all choices are within 0-10', () => {
    for (let i = 0; i < 50; i++) {
      const choices = generateChoices(5)
      choices.forEach((c) => {
        expect(c).toBeGreaterThanOrEqual(0)
        expect(c).toBeLessThanOrEqual(10)
      })
    }
  })
})

describe('generatePattern', () => {
  it('returns visible array, answer, and choices', () => {
    for (let i = 0; i < 20; i++) {
      const p = generatePattern()
      expect(p.visible).toBeDefined()
      expect(Array.isArray(p.visible)).toBe(true)
      expect(p.visible.length).toBeGreaterThanOrEqual(4)
      expect(p.answer).toBeDefined()
      expect(p.answer).toHaveProperty('name')
      expect(p.answer).toHaveProperty('color')
      expect(p.choices).toHaveLength(4)
    }
  })

  it('choices include the correct answer', () => {
    for (let i = 0; i < 20; i++) {
      const p = generatePattern()
      const names = p.choices.map((c) => c.name)
      expect(names).toContain(p.answer.name)
    }
  })

  it('all choices have unique names', () => {
    for (let i = 0; i < 20; i++) {
      const p = generatePattern()
      const names = p.choices.map((c) => c.name)
      expect(new Set(names).size).toBe(4)
    }
  })
})
