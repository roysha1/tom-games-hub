import '@testing-library/jest-dom'

// Mock Web Audio API
class MockAudioContext {
  createOscillator() {
    return {
      type: '',
      frequency: { value: 0 },
      connect: () => {},
      start: () => {},
      stop: () => {},
    }
  }
  createGain() {
    return {
      gain: { value: 0, exponentialRampToValueAtTime: () => {} },
      connect: () => {},
    }
  }
  get currentTime() { return 0 }
  get destination() { return {} }
}

globalThis.AudioContext = MockAudioContext
globalThis.webkitAudioContext = MockAudioContext
