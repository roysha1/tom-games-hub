import { HEBREW_LETTERS, PATTERN_COLORS } from './data'

export function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function pickLetterChoices(correctLetter, count = 6) {
  const others = HEBREW_LETTERS.filter((l) => l !== correctLetter)
  const shuffledOthers = shuffleArray(others).slice(0, count - 1)
  return shuffleArray([correctLetter, ...shuffledOthers])
}

export function generateProblem() {
  const isAddition = Math.random() > 0.3
  if (isAddition) {
    const a = Math.floor(Math.random() * 9) + 1
    const b = Math.floor(Math.random() * (10 - a)) + 1
    return { a, b, op: '+', answer: a + b }
  } else {
    const answer = Math.floor(Math.random() * 9)
    const b = Math.floor(Math.random() * (10 - answer)) + 1
    const a = answer + b
    return { a, b, op: '−', answer }
  }
}

export function generateChoices(correct) {
  const choices = new Set([correct])
  let attempts = 0
  while (choices.size < 4 && attempts < 100) {
    attempts++
    const offset = Math.floor(Math.random() * 7) - 3 // -3 to +3
    const wrong = correct + offset
    if (wrong >= 0 && wrong <= 10 && wrong !== correct) {
      choices.add(wrong)
    }
  }
  // Fallback: fill remaining with sequential values
  for (let v = 0; v <= 10 && choices.size < 4; v++) {
    if (v !== correct) choices.add(v)
  }
  return shuffleArray([...choices])
}

export function generatePattern() {
  const shuffled = shuffleArray(PATTERN_COLORS)
  const unitLen = Math.random() > 0.5 ? 2 : 3
  const unit = shuffled.slice(0, unitLen)

  const repeatCount = unitLen === 2 ? 3 : 2
  const fullSeq = []
  for (let r = 0; r < repeatCount + 1; r++) {
    for (let i = 0; i < unit.length; i++) {
      fullSeq.push(unit[i])
    }
  }

  const visibleLen = unitLen * repeatCount + (unitLen - 1)
  const visible = fullSeq.slice(0, visibleLen)
  const answer = fullSeq[visibleLen]

  const otherColors = PATTERN_COLORS.filter((c) => c.name !== answer.name)
  const distractors = shuffleArray(otherColors).slice(0, 3)
  const choices = shuffleArray([answer, ...distractors])

  return { visible, answer, choices }
}
