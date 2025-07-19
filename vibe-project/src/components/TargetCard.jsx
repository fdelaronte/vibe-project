// TargetCard.jsx – logs each hit via onLog, maintains zoom overlay
import { useState } from 'react';
import { motion } from 'framer-motion';
import zoomIcon from '../assets/zoom.png';

export default function TargetCard({ data, onClick, onLog, onView }) {
  const [flashBtn, setFlashBtn] = useState(null);

  /* ADD_POINTS + ADD_LOG */
  function registerHit(type) {
    const result = type === 'k' ? 'K‑Kill' : 'M‑Kill';
    const pts    = type === 'k' ? data.xp : Math.ceil(data.xp / 2);

    onClick(pts);              // add score
    onLog(data.title, result); // add ticker entry

    setFlashBtn(type);
    setTimeout(() => setFlashBtn(null), 250);
  }

  return (
    <motion.article className="card card--horizontal">
      {/* clickable thumbnail + zoom icon */}
      <div className="card__thumb" onClick={() => onView(data.img)}>
        <img src={data.img} alt={data.title} className="card__img" />
        <img src={zoomIcon} alt="" className="card__zoom" />
      </div>

      {/* text & buttons */}
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
            onClick={() => registerHit('k')}
          >
            K‑Kill
          </button>

          <button
            type="button"
            className={`btn btn--mkill motion-scale ${
              flashBtn === 'm' ? 'flash' : ''
            }`}
            onClick={() => registerHit('m')}
          >
            M‑Kill
          </button>
        </div>
      </div>
    </motion.article>
  );
}
