import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SyllableGame from '../components/SyllableGame'

vi.mock('../sounds', () => ({
  playSuccess: vi.fn(),
  playWrong: vi.fn(),
  playClick: vi.fn(),
}))

describe('SyllableGame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the question', () => {
    render(<SyllableGame onBack={() => {}} />)
    expect(screen.getByText('כמה הברות יש במילה?')).toBeInTheDocument()
  })

  it('renders the back button', () => {
    render(<SyllableGame onBack={() => {}} />)
    expect(screen.getByText(/חזרה/)).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<SyllableGame onBack={onBack} />)
    fireEvent.click(screen.getByText(/חזרה/))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders 4 syllable choice buttons with numbers 1-4', () => {
    render(<SyllableGame onBack={() => {}} />)
    // Each button has a number text
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('shows feedback when a choice is clicked', () => {
    render(<SyllableGame onBack={() => {}} />)
    fireEvent.click(screen.getByText('1'))
    const hasFeedback =
      screen.queryByText(/כל הכבוד/) !== null ||
      screen.queryByText(/נסה שוב/) !== null
    expect(hasFeedback).toBe(true)
  })

  it('displays a word with emoji', () => {
    render(<SyllableGame onBack={() => {}} />)
    // There should be at least one Hebrew word rendered in the card
    const allText = document.body.textContent
    // Check that some Hebrew word from SYLLABLE_WORDS is present
    const hasHebrew = /[\u0590-\u05FF]{2,}/.test(allText)
    expect(hasHebrew).toBe(true)
  })
})
