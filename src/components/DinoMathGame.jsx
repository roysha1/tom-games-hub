import { useState, useMemo } from 'react'
import { generateProblem, generateChoices } from '../utils'
import { playSuccess, playWrong, playClick } from '../sounds'
import Confetti from './Confetti'

// Render dino emojis for a count
function DinoRow({ count }) {
  return (
    <div className="flex gap-0.5 md:gap-1 justify-center flex-wrap">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="text-2xl sm:text-3xl md:text-5xl">🦕</span>
      ))}
    </div>
  )
}

function DinoMathGame({ onBack }) {
  const [problem, setProblem] = useState(() => generateProblem())
  const [feedback, setFeedback] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const choices = useMemo(
    () => generateChoices(problem.answer),
    [problem]
  )

  const handleChoice = (num) => {
    if (feedback) return
    playClick()
    setSelectedAnswer(num)

    if (num === problem.answer) {
      playSuccess()
      setFeedback('correct')
      setScore((s) => s + 1)
      setShowConfetti(true)
      setTotalAnswered((c) => c + 1)

      setTimeout(() => {
        setShowConfetti(false)
        setFeedback(null)
        setSelectedAnswer(null)
        setProblem(generateProblem())
      }, 1800)
    } else {
      playWrong()
      setFeedback('wrong')
      setTimeout(() => {
        setFeedback(null)
        setSelectedAnswer(null)
      }, 800)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-lime-300 to-green-600 flex flex-col items-center px-3 py-3 md:p-4 gap-2 md:gap-4 relative">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/90 text-green-600 text-base md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          🏠 חזרה
        </button>
        <span className="text-lg md:text-2xl font-bold text-white bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
          ⭐ {score}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
        🦕 דינו-חשבון 🦕
      </h2>

      {/* Problem card */}
      <div
        className={`bg-white rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col items-center gap-2 md:gap-4 w-full max-w-sm md:max-w-lg transition-transform duration-300
          ${feedback === 'correct' ? 'animate-bounce-in' : ''}
          ${feedback === 'wrong' ? 'animate-shake' : ''}`}
      >
        {/* Visual dinos */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-wrap justify-center" dir="ltr">
          <DinoRow count={problem.a} />
          <span className="text-3xl md:text-5xl font-extrabold text-gray-700">{problem.op}</span>
          <DinoRow count={problem.b} />
          <span className="text-3xl md:text-5xl font-extrabold text-gray-700">= ?</span>
        </div>

        {/* Numeric equation */}
        <div className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-700" dir="ltr">
          {problem.a} {problem.op} {problem.b} = ?
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

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 w-full max-w-xs md:max-w-md">
        {choices.map((num) => {
          let btnClass =
            'flex flex-col items-center gap-1 py-3 md:py-5 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border-4 '

          if (selectedAnswer === num && feedback === 'correct') {
            btnClass += 'bg-green-400 border-green-500 text-white scale-110'
          } else if (selectedAnswer === num && feedback === 'wrong') {
            btnClass += 'bg-red-400 border-red-500 text-white animate-shake'
          } else {
            btnClass +=
              'bg-white hover:bg-lime-50 border-lime-200 hover:border-lime-400 text-gray-800 hover:scale-105 active:scale-95'
          }

          return (
            <button
              key={num}
              onClick={() => handleChoice(num)}
              className={btnClass}
              disabled={feedback === 'correct'}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{num}</span>
              <span className="text-base md:text-2xl">{'🦕'.repeat(Math.min(num, 5))}{num > 5 ? '…' : ''}</span>
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

export default DinoMathGame
