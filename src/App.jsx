import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import FirstLetterGame from './components/FirstLetterGame'
import OppositesGame from './components/OppositesGame'
import SyllableGame from './components/SyllableGame'
import DinoMathGame from './components/DinoMathGame'
import PatternGame from './components/PatternGame'
import ABCSoundsGame from './components/ABCSoundsGame'

function App() {
  const [screen, setScreen] = useState('home')

  return (
    <div className="min-h-screen w-full">
      {screen === 'home' && (
        <HomeScreen
          onSelectGame={(game) => setScreen(game)}
        />
      )}
      {screen === 'firstLetter' && (
        <FirstLetterGame onBack={() => setScreen('home')} />
      )}
      {screen === 'opposites' && (
        <OppositesGame onBack={() => setScreen('home')} />
      )}
      {screen === 'syllables' && (
        <SyllableGame onBack={() => setScreen('home')} />
      )}
      {screen === 'dinoMath' && (
        <DinoMathGame onBack={() => setScreen('home')} />
      )}
      {screen === 'pattern' && (
        <PatternGame onBack={() => setScreen('home')} />
      )}
      {screen === 'abcSounds' && (
        <ABCSoundsGame onBack={() => setScreen('home')} />
      )}
    </div>
  )
}

export default App
