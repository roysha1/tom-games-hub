import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PatternGame from '../components/PatternGame'

vi.mock('../sounds', () => ({
  playSuccess: vi.fn(),
  playWrong: vi.fn(),
  playClick: vi.fn(),
}))

describe('PatternGame', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the question', () => {
    render(<PatternGame onBack={() => {}} />)
    expect(screen.getByText('מה בא אחר כך?')).toBeInTheDocument()
  })

  it('renders the back button', () => {
    render(<PatternGame onBack={() => {}} />)
    expect(screen.getByText(/חזרה/)).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<PatternGame onBack={onBack} />)
    fireEvent.click(screen.getByText(/חזרה/))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders 4 color choice buttons', () => {
    render(<PatternGame onBack={() => {}} />)
    const allButtons = screen.getAllByRole('button')
    const choiceButtons = allButtons.filter(
      (btn) => !btn.textContent.includes('חזרה')
    )
    expect(choiceButtons).toHaveLength(4)
  })

  it('renders the ? placeholder in the pattern', () => {
    render(<PatternGame onBack={() => {}} />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('shows feedback when a choice is clicked', () => {
    render(<PatternGame onBack={() => {}} />)
    const choiceButtons = screen.getAllByRole('button').filter(
      (btn) => !btn.textContent.includes('חזרה')
    )
    fireEvent.click(choiceButtons[0])
    const hasFeedback =
      screen.queryByText(/כל הכבוד/) !== null ||
      screen.queryByText(/נסה שוב/) !== null
    expect(hasFeedback).toBe(true)
  })

  it('displays the question counter', () => {
    render(<PatternGame onBack={() => {}} />)
    expect(screen.getByText(/שאלה/)).toBeInTheDocument()
  })
})
