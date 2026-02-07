import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ABCSoundsGame from '../components/ABCSoundsGame'

vi.mock('../sounds', () => ({
  playSuccess: vi.fn(),
  playWrong: vi.fn(),
  playClick: vi.fn(),
  playTTS: vi.fn(),
}))

import { playClick, playTTS } from '../sounds'

describe('ABCSoundsGame', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    expect(screen.getByText('🔤 ABC Sounds')).toBeInTheDocument()
  })

  it('renders the back button in Hebrew', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    expect(screen.getByText(/חזרה/)).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<ABCSoundsGame onBack={onBack} />)
    fireEvent.click(screen.getByText(/חזרה/))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders all 26 letter buttons', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    letters.forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument()
    })
  })

  it('shows placeholder text before any letter is selected', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    expect(screen.getByText('👆 Pick a letter!')).toBeInTheDocument()
  })

  it('displays the word and emoji when a letter is clicked', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    fireEvent.click(screen.getByText('A'))
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('🍎')).toBeInTheDocument()
  })

  it('calls playClick and playTTS when a letter is clicked', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    fireEvent.click(screen.getByText('D'))
    expect(playClick).toHaveBeenCalled()
    expect(playTTS).toHaveBeenCalledWith("D is for Dinosaur. D says Duh!")
  })

  it('shows the Listen Again button after selecting a letter', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    fireEvent.click(screen.getByText('B'))
    expect(screen.getByText(/Listen Again/)).toBeInTheDocument()
  })

  it('replays TTS when Listen Again is clicked', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    fireEvent.click(screen.getByText('C'))
    vi.clearAllMocks()
    fireEvent.click(screen.getByText(/Listen Again/))
    expect(playTTS).toHaveBeenCalledWith("C is for Cat. C says Cuh.")
  })

  it('hides placeholder after a letter is selected', () => {
    render(<ABCSoundsGame onBack={() => {}} />)
    fireEvent.click(screen.getByText('E'))
    expect(screen.queryByText('👆 Pick a letter!')).not.toBeInTheDocument()
  })
})
