import { useState, useCallback, useMemo } from 'react'
import { PATTERN_COLORS } from '../data'
import { playSuccess, playWrong, playClick } from '../sounds'
import Confetti from './Confetti'

function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generatePattern() {
  // Pick 2-3 distinct colors for the repeating unit
  const shuffled = shuffleArray(PATTERN_COLORS)
  const unitLen = Math.random() > 0.5 ? 2 : 3
  const unit = shuffled.slice(0, unitLen)

  // Repeat the unit to create a sequence of 5-7 items, then the answer is the next
  const repeatCount = unitLen === 2 ? 3 : 2
  const fullSeq = []
  for (let r = 0; r < repeatCount + 1; r++) {
    for (let i = 0; i < unit.length; i++) {
      fullSeq.push(unit[i])
    }
  }

  // Show part of the sequence, answer is the next item
  const visibleLen = unitLen * repeatCount + (unitLen - 1) // show enough to see the pattern + one missing
  const visible = fullSeq.slice(0, visibleLen)
  const answer = fullSeq[visibleLen]

  // Generate choices: the correct answer + 3 random other colors
  const otherColors = PATTERN_COLORS.filter((c) => c.name !== answer.name)
  const distractors = shuffleArray(otherColors).slice(0, 3)
  const choices = shuffleArray([answer, ...distractors])

  return { visible, answer, choices }
}

function PatternGame({ onBack }) {
  const [pattern, setPattern] = useState(() => generatePattern())
  const [feedback, setFeedback] = useState(null)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const handleChoice = useCallback((choice, idx) => {
    if (feedback) return
    playClick()
    setSelectedIdx(idx)

    if (choice.name === pattern.answer.name) {
      playSuccess()
      setFeedback('correct')
      setScore((s) => s + 1)
      setShowConfetti(true)
      setTotalAnswered((c) => c + 1)

      setTimeout(() => {
        setShowConfetti(false)
        setFeedback(null)
        setSelectedIdx(null)
        setPattern(generatePattern())
      }, 1800)
    } else {
      playWrong()
      setFeedback('wrong')
      setTimeout(() => {
        setFeedback(null)
        setSelectedIdx(null)
      }, 800)
    }
  }, [pattern, feedback])

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-indigo-300 to-violet-600 flex flex-col items-center px-3 py-3 md:p-4 gap-2 md:gap-4 relative">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/90 text-violet-600 text-base md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          🏠 חזרה
        </button>
        <span className="text-lg md:text-2xl font-bold text-white bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
          ⭐ {score}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
        מה בא אחר כך?
      </h2>

      {/* Pattern display */}
      <div
        className={`bg-white rounded-3xl shadow-2xl p-4 md:p-8 w-full max-w-sm md:max-w-lg transition-transform duration-300
          ${feedback === 'correct' ? 'animate-bounce-in' : ''}
          ${feedback === 'wrong' ? 'animate-shake' : ''}`}
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          {pattern.visible.map((item, i) => (
            <div
              key={i}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl shadow-md border-2 border-gray-200"
              style={{ backgroundColor: item.color }}
            />
          ))}
          {/* Question mark placeholder */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl shadow-md border-3 md:border-4 border-dashed border-gray-400 flex items-center justify-center bg-gray-100">
            <span className="text-xl md:text-3xl font-extrabold text-gray-400">?</span>
          </div>
        </div>
      </div>

      {/* Feedback message */}
      <div className="h-8 md:h-12 flex items-center justify-center">
        {feedback === 'correct' && (
          <div className="animate-bounce-in flex items-center gap-2">
            <span className="text-2xl md:text-3xl animate-star-pop">⭐</span>
            <span className="text-2xl md:text-3xl font-extrabold text-yellow-200 drop-shadow-lg">
              כל הכבוד! 🎉
            </span>
            <span className="text-2xl md:text-3xl animate-star-pop" style={{ animationDelay: '0.2s' }}>⭐</span>
          </div>
        )}
        {feedback === 'wrong' && (
          <span className="text-xl md:text-2xl font-bold text-red-200 animate-shake">
            נסה שוב! 💪
          </span>
        )}
      </div>

      {/* Color choices */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 w-full max-w-xs md:max-w-md">
        {pattern.choices.map((choice, idx) => {
          let btnClass =
            'flex items-center gap-2 md:gap-3 py-3 px-3 md:py-5 md:px-6 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border-4 '

          if (selectedIdx === idx && feedback === 'correct') {
            btnClass += 'bg-green-400 border-green-500 scale-110'
          } else if (selectedIdx === idx && feedback === 'wrong') {
            btnClass += 'bg-red-400 border-red-500 animate-shake'
          } else {
            btnClass +=
              'bg-white hover:bg-violet-50 border-violet-200 hover:border-violet-400 hover:scale-105 active:scale-95'
          }

          return (
            <button
              key={idx}
              onClick={() => handleChoice(choice, idx)}
              className={btnClass}
              disabled={feedback === 'correct'}
            >
              <div
                className="w-8 h-8 md:w-12 md:h-12 rounded-lg shadow-sm border border-gray-200 shrink-0"
                style={{ backgroundColor: choice.color }}
              />
              <span className="text-lg md:text-2xl font-extrabold text-gray-700">{choice.name}</span>
            </button>
          )
        })}
      </div>

      {/* Round counter */}
      <div className="text-base md:text-xl font-bold text-white/80">
        שאלה {totalAnswered + 1}
      </div>
    </div>
  )
}

export default PatternGame
