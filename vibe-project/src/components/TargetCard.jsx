// TargetCard.jsx – with mini‑explosion confetti on every hit
import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import zoomIcon from '../assets/zoom.png';

export default function TargetCard({ data, onClick, onLog, onView }) {
  const [flashBtn, setFlashBtn] = useState(null);

  /* ------------------------------------------------------------------
     Utility: small, button‑centred confetti burst
  ------------------------------------------------------------------ */
  function blow(event) {
    const { x, y, width } = event.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 200,
      startVelocity: 20,
      spread: 100,
      scalar: 0.7,
      colors: ['#ff4500', '#ff0000', '#ffd700', '#000000'], // orange, red, yellow, black
      origin: {
        x: (x + width / 2) / window.innerWidth,
        y: y / window.innerHeight
      }
    });
  }

  /* ------------------------------------------------------------------
     Register hit, add points & log, then confetti
  ------------------------------------------------------------------ */
  function registerHit(type, e) {
    const result = type === 'k' ? 'K‑Kill' : 'M‑Kill';
    const pts    = type === 'k' ? data.xp : Math.ceil(data.xp / 2);

    onClick(pts);
    onLog(data.title, result);
    blow(e);                    // mini explosion
    setFlashBtn(type);
    setTimeout(() => setFlashBtn(null), 250);
  }

  return (
    <motion.article className="card card--horizontal">
      {/* Thumbnail + zoom */}
      <div className="card__thumb" onClick={() => onView(data.img)}>
        <img src={data.img} alt={data.title} className="card__img" />
        <img src={zoomIcon} alt="" className="card__zoom" />
      </div>

      {/* Text + actions */}
      <div className="card__content">
        <div className="card__text">
          <h3 className="card__title">{data.title}</h3>
          <p className="card__desc">{data.description}</p>
          <p className="card__category">{data.category}</p>
        </div>

        <div className="card__actions">
          <button
            type="button"
            className={`btn btn--kkill motion-scale ${
              flashBtn === 'k' ? 'flash' : ''
            }`}
            onClick={(e) => registerHit('k', e)}
          >
            K‑Kill
          </button>

          <button
            type="button"
            className={`btn btn--mkill motion-scale ${
              flashBtn === 'm' ? 'flash' : ''
            }`}
            onClick={(e) => registerHit('m', e)}
          >
            M‑Kill
          </button>
        </div>
      </div>
    </motion.article>
  );
}
