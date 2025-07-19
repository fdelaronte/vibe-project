// RankUpOverlay.jsx – 1.5 s self‑dismissing promotion blast
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * Props
 *   rank   (string)   – name of new rank (required)
 *   onDone (() => {}) – callback to unmount overlay after 1.5 s
 */
export default function RankUpOverlay({ rank, onDone }) {
  useEffect(() => {
    /* audio (optional) — comment out if file not present */
    // new Audio('/sounds/rankUp.mp3').play().catch(() => {});

    /* confetti burst */
    confetti({
      particleCount: 250,
      spread: 120,
      startVelocity: 35,
      scalar: 1.1,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#c0c0c0', '#ff0000', '#000000'],
    });

    const id = setTimeout(onDone, 3000);      // auto‑dismiss
    return () => clearTimeout(id);
  }, [onDone]);

  if (!rank) return null;

  return (
    <div className="rank-overlay">
      <div className="rank-blast">
        <span className="rank-label">PROMOTED&nbsp;TO</span>
        <h2 className="rank-name">{rank}</h2>
      </div>
      <div className="rank-shockwave" />
    </div>
  );
}
