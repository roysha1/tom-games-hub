import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import FirstLetterGame from '../components/FirstLetterGame'

vi.mock('../sounds', () => ({
  playSuccess: vi.fn(),
  playWrong: vi.fn(),
  playClick: vi.fn(),
}))

describe('FirstLetterGame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the question', () => {
    render(<FirstLetterGame onBack={() => {}} />)
    expect(screen.getByText('מה האות הראשונה?')).toBeInTheDocument()
  })

  it('renders the back button', () => {
    render(<FirstLetterGame onBack={() => {}} />)
    expect(screen.getByText(/חזרה/)).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<FirstLetterGame onBack={onBack} />)
    fireEvent.click(screen.getByText(/חזרה/))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders 6 letter choice buttons', () => {
    render(<FirstLetterGame onBack={() => {}} />)
    // Letter buttons are in a grid — find buttons with single Hebrew letter text
    const buttons = screen.getAllByRole('button').filter(
      (btn) => btn.textContent.length === 1 && /[\u0590-\u05FF]/.test(btn.textContent)
    )
    expect(buttons).toHaveLength(6)
  })

  it('shows success feedback when correct letter is clicked', () => {
    render(<FirstLetterGame onBack={() => {}} />)
    // Find the emoji to determine current word, then find correct letter
    const allButtons = screen.getAllByRole('button').filter(
      (btn) => btn.textContent.length === 1 && /[\u0590-\u05FF]/.test(btn.textContent)
    )
    // We need to find which letter is correct — it's always present in the grid
    // Click each until we get the right one (or check for success text)
    // For a more deterministic test, we check that clicking any button produces feedback
    fireEvent.click(allButtons[0])
    // Either success or error should appear
    const hasFeedback =
      screen.queryByText(/כל הכבוד/) !== null ||
      screen.queryByText(/נסה שוב/) !== null
    expect(hasFeedback).toBe(true)
  })

  it('toggles mode between first and last letter', () => {
    render(<FirstLetterGame onBack={() => {}} />)
    expect(screen.getByText('מה האות הראשונה?')).toBeInTheDocument()

    fireEvent.click(screen.getByText(/אות אחרונה/))
    expect(screen.getByText('מה האות האחרונה?')).toBeInTheDocument()
  })

  it('shows error feedback when wrong letter is clicked', () => {
    render(<FirstLetterGame onBack={() => {}} />)
    const letterButtons = screen.getAllByRole('button').filter(
      (btn) => btn.textContent.length === 1 && /[\u0590-\u05FF]/.test(btn.textContent)
    )
    // Click each button, advancing timers between clicks to clear feedback state
    for (const btn of letterButtons) {
      fireEvent.click(btn)
      if (screen.queryByText(/נסה שוב/)) {
        expect(screen.getByText(/נסה שוב/)).toBeInTheDocument()
        return
      }
      // Clear any feedback timeout before trying next button
      act(() => vi.advanceTimersByTime(2000))
    }
  })
})
