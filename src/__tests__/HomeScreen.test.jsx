import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HomeScreen from '../components/HomeScreen'

describe('HomeScreen', () => {
  it('renders the title', () => {
    render(<HomeScreen onSelectGame={() => {}} />)
    expect(screen.getByText(/המשחק של טום/)).toBeInTheDocument()
  })

  it('renders all 6 game buttons', () => {
    render(<HomeScreen onSelectGame={() => {}} />)
    expect(screen.getByText('אות ראשונה ואחרונה')).toBeInTheDocument()
    expect(screen.getByText('הפכים')).toBeInTheDocument()
    expect(screen.getByText('ספירת הברות')).toBeInTheDocument()
    expect(screen.getByText('דינו-חשבון')).toBeInTheDocument()
    expect(screen.getByText('השלמת דפוסים')).toBeInTheDocument()
    expect(screen.getByText('ABC Sounds')).toBeInTheDocument()
  })

  it('calls onSelectGame with "firstLetter" when clicking first letter button', () => {
    const onSelectGame = vi.fn()
    render(<HomeScreen onSelectGame={onSelectGame} />)
    fireEvent.click(screen.getByText('אות ראשונה ואחרונה'))
    expect(onSelectGame).toHaveBeenCalledWith('firstLetter')
  })

  it('calls onSelectGame with "opposites" when clicking opposites button', () => {
    const onSelectGame = vi.fn()
    render(<HomeScreen onSelectGame={onSelectGame} />)
    fireEvent.click(screen.getByText('הפכים'))
    expect(onSelectGame).toHaveBeenCalledWith('opposites')
  })

  it('calls onSelectGame with "syllables" when clicking syllable button', () => {
    const onSelectGame = vi.fn()
    render(<HomeScreen onSelectGame={onSelectGame} />)
    fireEvent.click(screen.getByText('ספירת הברות'))
    expect(onSelectGame).toHaveBeenCalledWith('syllables')
  })

  it('calls onSelectGame with "dinoMath" when clicking dino button', () => {
    const onSelectGame = vi.fn()
    render(<HomeScreen onSelectGame={onSelectGame} />)
    fireEvent.click(screen.getByText('דינו-חשבון'))
    expect(onSelectGame).toHaveBeenCalledWith('dinoMath')
  })

  it('calls onSelectGame with "pattern" when clicking pattern button', () => {
    const onSelectGame = vi.fn()
    render(<HomeScreen onSelectGame={onSelectGame} />)
    fireEvent.click(screen.getByText('השלמת דפוסים'))
    expect(onSelectGame).toHaveBeenCalledWith('pattern')
  })

  it('calls onSelectGame with "abcSounds" when clicking ABC Sounds button', () => {
    const onSelectGame = vi.fn()
    render(<HomeScreen onSelectGame={onSelectGame} />)
    fireEvent.click(screen.getByText('ABC Sounds'))
    expect(onSelectGame).toHaveBeenCalledWith('abcSounds')
  })
})
