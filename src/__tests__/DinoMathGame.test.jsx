import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DinoMathGame from '../components/DinoMathGame'

vi.mock('../sounds', () => ({
  playSuccess: vi.fn(),
  playWrong: vi.fn(),
  playClick: vi.fn(),
}))

describe('DinoMathGame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the title', () => {
    render(<DinoMathGame onBack={() => {}} />)
    expect(screen.getByText(/דינו-חשבון/)).toBeInTheDocument()
  })

  it('renders the back button', () => {
    render(<DinoMathGame onBack={() => {}} />)
    expect(screen.getByText(/חזרה/)).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<DinoMathGame onBack={onBack} />)
    fireEvent.click(screen.getByText(/חזרה/))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders 4 answer choice buttons', () => {
    render(<DinoMathGame onBack={() => {}} />)
    const allButtons = screen.getAllByRole('button')
    // Back button + 4 answer buttons = 5
    const answerButtons = allButtons.filter(
      (btn) => !btn.textContent.includes('חזרה')
    )
    expect(answerButtons).toHaveLength(4)
  })

  it('displays a math equation with = ?', () => {
    render(<DinoMathGame onBack={() => {}} />)
    expect(screen.getAllByText(/= \?/).length).toBeGreaterThanOrEqual(1)
  })

  it('shows feedback when an answer is clicked', () => {
    render(<DinoMathGame onBack={() => {}} />)
    const answerButtons = screen.getAllByRole('button').filter(
      (btn) => !btn.textContent.includes('חזרה')
    )
    fireEvent.click(answerButtons[0])
    const hasFeedback =
      screen.queryByText(/כל הכבוד/) !== null ||
      screen.queryByText(/נסה שוב/) !== null
    expect(hasFeedback).toBe(true)
  })

  it('displays the question counter', () => {
    render(<DinoMathGame onBack={() => {}} />)
    expect(screen.getByText(/שאלה/)).toBeInTheDocument()
  })
})
