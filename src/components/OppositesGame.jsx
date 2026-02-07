import { useState, useMemo, useCallback } from 'react'
import { OPPOSITES_BASIC, OPPOSITES_ADVANCED } from '../data'
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

function OppositesGame({ onBack }) {
  const [advanced, setAdvanced] = useState(false)
  const [roundIndex, setRoundIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [completedRounds, setCompletedRounds] = useState(0)

  const pairs = advanced
    ? [...OPPOSITES_BASIC, ...OPPOSITES_ADVANCED]
    : OPPOSITES_BASIC

  // Shuffle pairs order once per mode
  const shuffledPairs = useMemo(
    () => shuffleArray(pairs),
    [advanced]
  )

  const currentPair = shuffledPairs[roundIndex % shuffledPairs.length]

  // Build answer choices: correct answer + 3 distractors from other pairs
  const choices = useMemo(() => {
    const correct = { word: currentPair.b, emoji: currentPair.emojiB, isCorrect: true }
    const otherPairs = shuffledPairs.filter((p) => p.b !== currentPair.b)
    const distractors = shuffleArray(otherPairs)
      .slice(0, 3)
      .map((p) => ({ word: p.b, emoji: p.emojiB, isCorrect: false }))
    return shuffleArray([correct, ...distractors])
  }, [roundIndex, advanced])

  const handleChoice = useCallback((choice, idx) => {
    if (feedback) return
    playClick()
    setSelectedIdx(idx)

    if (choice.isCorrect) {
      playSuccess()
      setFeedback('correct')
      setScore((s) => s + 1)
      setShowConfetti(true)
      setCompletedRounds((c) => c + 1)

      setTimeout(() => {
        setShowConfetti(false)
        setFeedback(null)
        setSelectedIdx(null)
        setRoundIndex((i) => i + 1)
      }, 1800)
    } else {
      playWrong()
      setFeedback('wrong')
      setTimeout(() => {
        setFeedback(null)
        setSelectedIdx(null)
      }, 800)
    }
  }, [feedback])

  const toggleAdvanced = () => {
    setAdvanced((a) => !a)
    setRoundIndex(0)
    setScore(0)
    setCompletedRounds(0)
    setFeedback(null)
    setSelectedIdx(null)
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-green-300 to-teal-500 flex flex-col items-center px-3 py-3 md:p-4 gap-2 md:gap-4 relative">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/90 text-teal-600 text-base md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          🏠 חזרה
        </button>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-lg md:text-2xl font-bold text-white bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
            ⭐ {score}
          </span>
          <button
            onClick={toggleAdvanced}
            className={`px-3 py-2 md:px-5 md:py-3 text-white text-sm md:text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition-all cursor-pointer ${
              advanced
                ? 'bg-purple-500 hover:bg-purple-600'
                : 'bg-amber-400 hover:bg-amber-500'
            }`}
          >
            {advanced ? '🧠 מתקדם' : '📗 רגיל'}
          </button>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
        מה ההפך?
      </h2>

      {/* Prompt card */}
      <div
        className={`bg-white rounded-3xl shadow-2xl px-6 py-4 md:px-10 md:py-8 flex flex-col items-center gap-2 md:gap-3 transition-transform duration-300
          ${feedback === 'correct' ? 'animate-bounce-in' : ''}
          ${feedback === 'wrong' ? 'animate-shake' : ''}`}
      >
        <span className="text-[60px] sm:text-[80px] md:text-[100px] leading-none">{currentPair.emojiA}</span>
        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-700">{currentPair.a}</span>
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

      {/* Answer grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 w-full max-w-sm md:max-w-lg">
        {choices.map((choice, idx) => {
          let btnClass =
            'flex flex-col items-center gap-1 md:gap-2 py-3 px-3 md:py-5 md:px-4 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border-4 '

          if (selectedIdx === idx && feedback === 'correct') {
            btnClass += 'bg-green-400 border-green-500 text-white scale-110'
          } else if (selectedIdx === idx && feedback === 'wrong') {
            btnClass += 'bg-red-400 border-red-500 text-white animate-shake'
          } else {
            btnClass +=
              'bg-white hover:bg-teal-50 border-teal-200 hover:border-teal-400 text-gray-800 hover:scale-105 active:scale-95'
          }

          return (
            <button
              key={idx}
              onClick={() => handleChoice(choice, idx)}
              className={btnClass}
              disabled={feedback === 'correct'}
            >
              <span className="text-3xl md:text-5xl">{choice.emoji}</span>
              <span className="text-lg md:text-2xl font-extrabold">{choice.word}</span>
            </button>
          )
        })}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 md:gap-2 mt-1 md:mt-2 flex-wrap justify-center max-w-xs md:max-w-none">
        {shuffledPairs.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              i < completedRounds
                ? 'bg-yellow-300 scale-110'
                : i === roundIndex % shuffledPairs.length
                  ? 'bg-white scale-125'
                  : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default OppositesGame
