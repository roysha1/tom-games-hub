const AudioCtx = window.AudioContext || window.webkitAudioContext
let _ctx = null

function getCtx() {
  if (!_ctx) _ctx = new AudioCtx()
  return _ctx
}

function playTone(freq, duration, type = 'sine', volume = 0.3) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.value = volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Audio not available
  }
}

export function playSuccess() {
  playTone(523, 0.15, 'sine', 0.25)       // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.25), 100)  // E5
  setTimeout(() => playTone(784, 0.3, 'sine', 0.3), 200)    // G5
}

export function playWrong() {
  playTone(200, 0.3, 'square', 0.15)
}

export function playClick() {
  playTone(880, 0.08, 'sine', 0.15)
}
