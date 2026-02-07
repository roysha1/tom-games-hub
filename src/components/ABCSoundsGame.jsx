import { useState } from 'react'
import { ALPHABET_DATA } from '../data'
import { playTTS } from '../sounds'
import { playClick } from '../sounds'

const LETTERS = Object.keys(ALPHABET_DATA)

function ABCSoundsGame({ onBack }) {
  const [selected, setSelected] = useState(null)

  const handleLetterClick = (letter) => {
    playClick()
    if (letter === selected) return
    setSelected(letter)
    const data = ALPHABET_DATA[letter]
    if (data) {
      playTTS(data.ttsPhrase)
    }
  }

  const handleReplay = () => {
    if (selected) {
      playTTS(ALPHABET_DATA[selected].ttsPhrase)
    }
  }

  const data = selected ? ALPHABET_DATA[selected] : null

  return (
    <div
      dir="ltr"
      className="min-h-[100dvh] bg-gradient-to-b from-cyan-300 to-blue-500 flex flex-col items-center px-3 py-3 md:p-4 gap-3 md:gap-5"
    >
      {/* Top bar */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2" dir="rtl">
        <button
          onClick={onBack}
          className="px-4 py-2 md:px-6 md:py-3 bg-white/90 text-blue-600 text-base md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          🏠 חזרה
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg" dir="ltr">
          🔤 ABC Sounds
        </h1>
      </div>

      {/* Letter grid */}
      <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-1.5 md:gap-2 w-full max-w-3xl">
        {LETTERS.map((letter) => {
          const isSelected = selected === letter
          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`aspect-square rounded-xl md:rounded-2xl text-xl sm:text-2xl md:text-3xl font-extrabold shadow-lg 
                transition-all duration-200 cursor-pointer border-3 
                ${isSelected
                  ? 'bg-yellow-400 border-yellow-500 scale-110 text-yellow-900'
                  : 'bg-white hover:bg-blue-50 border-white/60 hover:border-blue-300 hover:scale-105 active:scale-95 text-gray-700'
                }`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* Display stage */}
      {data ? (
        <div className="animate-bounce-in bg-white rounded-3xl shadow-2xl p-5 md:p-8 w-full max-w-md md:max-w-lg flex flex-col items-center gap-3 md:gap-5">
          {/* Big letter */}
          <div
            className="text-6xl sm:text-7xl md:text-9xl font-extrabold drop-shadow-md"
            style={{ color: data.color }}
          >
            {selected}
          </div>

          {/* Emoji image placeholder */}
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center text-6xl sm:text-7xl md:text-8xl shadow-inner border-4 border-gray-100"
            style={{ backgroundColor: data.color + '20' }}
          >
            {data.emoji}
          </div>

          {/* Word */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-700">
            {data.word}
          </p>

          {/* Replay TTS button */}
          <button
            onClick={handleReplay}
            className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-lg md:text-xl font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            🔊 Listen Again
          </button>
        </div>
      ) : (
        <div className="bg-white/30 rounded-3xl p-8 md:p-12 w-full max-w-md md:max-w-lg flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-bold text-white/80 text-center">
            👆 Pick a letter!
          </p>
        </div>
      )}
    </div>
  )
}

export default ABCSoundsGame
