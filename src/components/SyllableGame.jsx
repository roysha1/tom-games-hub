import { useState, useCallback, useMemo } from 'react'
import { SYLLABLE_WORDS } from '../data'
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

function SyllableGame({ onBack }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [selectedNum, setSelectedNum] = useState(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)

  const shuffledWords = useMemo(() => shuffleArray(SYLLABLE_WORDS), [])
  const currentWord = shuffledWords[wordIndex % shuffledWords.length]
  const maxSyllables = 4
  const choices = Array.from({ length: maxSyllables }, (_, i) => i + 1)

  const handleChoice = useCallback((num) => {
    if (feedback) return
    playClick()
    setSelectedNum(num)

    if (num === currentWord.syllables) {
      playSuccess()
      setFeedback('correct')
      setScore((s) => s + 1)
      setShowConfetti(true)
      setAnsweredCount((c) => c + 1)

      setTimeout(() => {
        setShowConfetti(false)
        setFeedback(null)
        setSelectedNum(null)
        setWordIndex((i) => (i + 1) % shuffledWords.length)
      }, 1800)
    } else {
      playWrong()
      setFeedback('wrong')
      setTimeout(() => {
        setFeedback(null)
        setSelectedNum(null)
      }, 800)
    }
  }, [currentWord, feedback, shuffledWords.length])

  // Render clapping hands for a number
  const renderClaps = (n) => '👏'.repeat(n)

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-purple-300 to-pink-500 flex flex-col items-center px-3 py-3 md:p-4 gap-2 md:gap-4 relative">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/90 text-purple-600 text-base md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          🏠 חזרה
        </button>
        <span className="text-lg md:text-2xl font-bold text-white bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
          ⭐ {score}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
        כמה הברות יש במילה?
      </h2>

      {/* Word card */}
      <div
        className={`bg-white rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col items-center gap-2 md:gap-3 transition-transform duration-300
          ${feedback === 'correct' ? 'animate-bounce-in' : ''}
          ${feedback === 'wrong' ? 'animate-shake' : ''}`}
      >
        <span className="text-[70px] sm:text-[90px] md:text-[130px] leading-none">{currentWord.emoji}</span>
        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-700">{currentWord.word}</span>
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

      {/* Clapping hands buttons */}
      <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-sm md:max-w-2xl">
        {choices.map((num) => {
          let btnClass =
            'flex flex-col items-center gap-1 py-3 px-2 md:py-4 md:px-5 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border-4 '

          if (selectedNum === num && feedback === 'correct') {
            btnClass += 'bg-green-400 border-green-500 text-white scale-110'
          } else if (selectedNum === num && feedback === 'wrong') {
            btnClass += 'bg-red-400 border-red-500 text-white animate-shake'
          } else {
            btnClass +=
              'bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-400 text-gray-800 hover:scale-105 active:scale-95'
          }

          return (
            <button
              key={num}
              onClick={() => handleChoice(num)}
              className={btnClass}
              disabled={feedback === 'correct'}
            >
              <span className="text-xl md:text-3xl">{renderClaps(num)}</span>
              <span className="text-xl md:text-2xl font-extrabold">{num}</span>
            </button>
          )
        })}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 md:gap-2 mt-1 md:mt-2 flex-wrap justify-center max-w-xs md:max-w-none">
        {shuffledWords.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              i < answeredCount
                ? 'bg-yellow-300 scale-110'
                : i === wordIndex % shuffledWords.length
                  ? 'bg-white scale-125'
                  : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default SyllableGame
