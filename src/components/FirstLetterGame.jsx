import { useState, useMemo } from 'react'
import { WORDS, getFirstLetter, getLastLetter } from '../data'
import { shuffleArray, pickLetterChoices } from '../utils'
import { playSuccess, playWrong, playClick } from '../sounds'
import Confetti from './Confetti'

function FirstLetterGame({ onBack }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [mode, setMode] = useState('first') // 'first' or 'last'
  const [feedback, setFeedback] = useState(null) // 'correct', 'wrong', or null
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [shuffledWords, setShuffledWords] = useState(() => shuffleArray(WORDS))

  const currentWord = shuffledWords[wordIndex]
  const correctLetter = mode === 'first'
    ? getFirstLetter(currentWord.word)
    : getLastLetter(currentWord.word)

  const choices = useMemo(
    () => pickLetterChoices(correctLetter),
    [wordIndex, mode]
  )

  const handleLetterClick = (letter) => {
    if (feedback) return
    playClick()
    setSelectedLetter(letter)

    if (letter === correctLetter) {
      playSuccess()
      setFeedback('correct')
      setScore((s) => s + 1)
      setShowConfetti(true)
      setAnsweredCount((c) => c + 1)

      setTimeout(() => {
        setShowConfetti(false)
        setFeedback(null)
        setSelectedLetter(null)
        setWordIndex((i) => (i + 1) % shuffledWords.length)
      }, 1800)
    } else {
      playWrong()
      setFeedback('wrong')
      setTimeout(() => {
        setFeedback(null)
        setSelectedLetter(null)
      }, 800)
    }
  }

  const toggleMode = () => {
    setMode((m) => m === 'first' ? 'last' : 'first')
    setFeedback(null)
    setSelectedLetter(null)
    setScore(0)
    setAnsweredCount(0)
    setWordIndex(0)
    setShuffledWords(shuffleArray(WORDS))
  }

  const question = mode === 'first'
    ? 'מה האות הראשונה?'
    : 'מה האות האחרונה?'

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-sky-300 to-blue-500 flex flex-col items-center px-3 py-3 md:p-4 gap-2 md:gap-4 relative">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/90 text-blue-600 text-base md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          🏠 חזרה
        </button>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-lg md:text-2xl font-bold text-white bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
            ⭐ {score}
          </span>
          <button
            onClick={toggleMode}
            className="px-3 py-2 md:px-5 md:py-3 bg-amber-400 hover:bg-amber-500 text-white text-sm md:text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            {mode === 'first' ? '🔄 אות אחרונה' : '🔄 אות ראשונה'}
          </button>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
        {question}
      </h2>

      {/* Image / Emoji card */}
      <div
        className={`bg-white rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col items-center gap-2 transition-transform duration-300 
          ${feedback === 'correct' ? 'animate-bounce-in' : ''} 
          ${feedback === 'wrong' ? 'animate-shake' : ''}`}
      >
        <span className="text-[70px] sm:text-[90px] md:text-[130px] leading-none">{currentWord.emoji}</span>
      </div>

      {/* Success / error message */}
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

      {/* Letter grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 w-full max-w-xs md:max-w-md">
        {choices.map((letter) => {
          let btnClass =
            'text-3xl sm:text-4xl md:text-5xl font-extrabold py-3 md:py-5 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border-4 '

          if (selectedLetter === letter && feedback === 'correct') {
            btnClass += 'bg-green-400 border-green-500 text-white scale-110'
          } else if (selectedLetter === letter && feedback === 'wrong') {
            btnClass += 'bg-red-400 border-red-500 text-white animate-shake'
          } else {
            btnClass +=
              'bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-400 text-gray-800 hover:scale-105 active:scale-95'
          }

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={btnClass}
              disabled={feedback === 'correct'}
            >
              {letter}
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
                : i === wordIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default FirstLetterGame
