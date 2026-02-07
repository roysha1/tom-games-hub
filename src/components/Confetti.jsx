import { useState } from 'react'

const CONFETTI_COLORS = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#F0A500']

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: Math.random() * 10 + 6,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute rounded-sm"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
