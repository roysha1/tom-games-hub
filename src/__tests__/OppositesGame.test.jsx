import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import OppositesGame from '../components/OppositesGame'

vi.mock('../sounds', () => ({
  playSuccess: vi.fn(),
  playWrong: vi.fn(),
  playClick: vi.fn(),
}))

describe('OppositesGame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the question', () => {
    render(<OppositesGame onBack={() => {}} />)
    expect(screen.getByText('מה ההפך?')).toBeInTheDocument()
  })

  it('renders the back button', () => {
    render(<OppositesGame onBack={() => {}} />)
    expect(screen.getByText(/חזרה/)).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<OppositesGame onBack={onBack} />)
    fireEvent.click(screen.getByText(/חזרה/))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders 4 answer choice buttons', () => {
    render(<OppositesGame onBack={() => {}} />)
    // The answer grid has 4 buttons (excluding back and mode toggle)
    const allButtons = screen.getAllByRole('button')
    // Back button + mode toggle + 4 answer buttons = 6
    const answerButtons = allButtons.filter(
      (btn) => !btn.textContent.includes('חזרה') && !btn.textContent.includes('רגיל') && !btn.textContent.includes('מתקדם')
    )
    expect(answerButtons).toHaveLength(4)
  })

  it('shows feedback when an answer is clicked', () => {
    render(<OppositesGame onBack={() => {}} />)
    const allButtons = screen.getAllByRole('button')
    const answerButtons = allButtons.filter(
      (btn) => !btn.textContent.includes('חזרה') && !btn.textContent.includes('רגיל') && !btn.textContent.includes('מתקדם')
    )
    fireEvent.click(answerButtons[0])
    const hasFeedback =
      screen.queryByText(/כל הכבוד/) !== null ||
      screen.queryByText(/נסה שוב/) !== null
    expect(hasFeedback).toBe(true)
  })

  it('toggles advanced mode', () => {
    render(<OppositesGame onBack={() => {}} />)
    expect(screen.getByText(/רגיל/)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/רגיל/))
    expect(screen.getByText(/מתקדם/)).toBeInTheDocument()
  })
})
