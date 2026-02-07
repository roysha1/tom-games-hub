function HomeScreen({ onSelectGame }) {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-yellow-300 via-orange-300 to-pink-400 flex flex-col items-center justify-center px-4 py-6 gap-5 md:gap-8">
      {/* Title */}
      <div className="text-center animate-float pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-1 md:mb-2">
          🎮 המשחק של טום 🌟
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-semibold">בחר משחק!</p>
      </div>

      {/* Game buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 w-full max-w-4xl relative z-10">
        {/* First & Last Letter */}
        <button
          onClick={() => onSelectGame('firstLetter')}
          className="bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 
                     text-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex flex-col items-center gap-2 md:gap-3 cursor-pointer border-3 md:border-4 border-white/30"
        >
          <span className="text-3xl md:text-5xl">🔤</span>
          <span className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight text-center">אות ראשונה ואחרונה</span>
          <span className="text-xs md:text-sm text-white/80 hidden sm:block">מצא את האות!</span>
        </button>

        {/* Opposites */}
        <button
          onClick={() => onSelectGame('opposites')}
          className="bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 
                     text-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex flex-col items-center gap-2 md:gap-3 cursor-pointer border-3 md:border-4 border-white/30"
        >
          <span className="text-3xl md:text-5xl">🔄</span>
          <span className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight text-center">הפכים</span>
          <span className="text-xs md:text-sm text-white/80 hidden sm:block">מצא את ההפך!</span>
        </button>

        {/* Syllable Counter */}
        <button
          onClick={() => onSelectGame('syllables')}
          className="bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 
                     text-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex flex-col items-center gap-2 md:gap-3 cursor-pointer border-3 md:border-4 border-white/30"
        >
          <span className="text-3xl md:text-5xl">👏</span>
          <span className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight text-center">ספירת הברות</span>
          <span className="text-xs md:text-sm text-white/80 hidden sm:block">כמה הברות יש?</span>
        </button>

        {/* Dino-Math */}
        <button
          onClick={() => onSelectGame('dinoMath')}
          className="bg-gradient-to-br from-lime-400 to-green-600 hover:from-lime-500 hover:to-green-700 
                     text-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex flex-col items-center gap-2 md:gap-3 cursor-pointer border-3 md:border-4 border-white/30"
        >
          <span className="text-3xl md:text-5xl">🦕</span>
          <span className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight text-center">דינו-חשבון</span>
          <span className="text-xs md:text-sm text-white/80 hidden sm:block">חיבור וחיסור!</span>
        </button>

        {/* Pattern Completion */}
        <button
          onClick={() => onSelectGame('pattern')}
          className="bg-gradient-to-br from-indigo-400 to-violet-600 hover:from-indigo-500 hover:to-violet-700 
                     text-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex flex-col items-center gap-2 md:gap-3 cursor-pointer border-3 md:border-4 border-white/30"
        >
          <span className="text-3xl md:text-5xl">🔴🔵🟢</span>
          <span className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight text-center">השלמת דפוסים</span>
          <span className="text-xs md:text-sm text-white/80 hidden sm:block">מה בא אחר כך?</span>
        </button>

        {/* English ABC Sounds */}
        <button
          onClick={() => onSelectGame('abcSounds')}
          className="bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 
                     text-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl 
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex flex-col items-center gap-2 md:gap-3 cursor-pointer border-3 md:border-4 border-white/30"
        >
          <span className="text-3xl md:text-5xl">🔤</span>
          <span className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight text-center" dir="ltr">ABC Sounds</span>
          <span className="text-xs md:text-sm text-white/80 hidden sm:block">!לימוד אותיות באנגלית</span>
        </button>
      </div>

      {/* Decorative stars */}
      <div className="flex gap-3 text-2xl md:text-4xl opacity-60 pointer-events-none">
        <span className="animate-float" style={{ animationDelay: '0s' }}>⭐</span>
        <span className="animate-float" style={{ animationDelay: '0.5s' }}>🌈</span>
        <span className="animate-float" style={{ animationDelay: '1s' }}>⭐</span>
        <span className="animate-float" style={{ animationDelay: '1.5s' }}>🎈</span>
        <span className="animate-float" style={{ animationDelay: '2s' }}>⭐</span>
      </div>
    </div>
  )
}

export default HomeScreen
