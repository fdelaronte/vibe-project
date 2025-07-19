// Sidebar.jsx — v7  (first click animates after reset)

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TYPE_SPEED = 25;
const fmt = ({ dtg, platform, result }) =>
  `${dtg} || <strong>${platform}</strong> || ${result}`;  // no leading “>”


export default function Sidebar({ log }) {
  const [lines, setLines] = useState([]);     // rendered HTML strings
  const [typing, setTyping] = useState(false);

  /* refs */
  const queueRef     = useRef([]);            // lines waiting to type
  const charIdxRef   = useRef(0);
  const prevLenRef   = useRef(0);             // last log length
  const timerRef     = useRef(null);
  const hydratedRef  = useRef(false);         // marks first pass done

  /* begin typing next line */
  const startNext = () => {
    if (!queueRef.current.length) { setTyping(false); return; }
    const full = queueRef.current.shift();
    charIdxRef.current = 0;
    setTyping(true);
    setLines(prev => ['', ...prev]);          // placeholder

    timerRef.current = setInterval(() => {
      charIdxRef.current += 1;
      setLines(prev => {
        const a = [...prev];
        a[0] = full.slice(0, charIdxRef.current);
        return a;
      });
      if (charIdxRef.current >= full.length) {
        clearInterval(timerRef.current);
        setLines(prev => {
          const [_, ...rest] = prev;
          return [full, ...rest];
        });
        startNext();
      }
    }, TYPE_SPEED);
  };

  /* watch log ------------------------------------------------------ */
  useEffect(() => {
    /* clear‑all ---------------------------------------------------- */
    if (log.length === 0) {
      clearInterval(timerRef.current);
      setLines([]);
      queueRef.current = [];
      prevLenRef.current = 0;
      setTyping(false);
      return;
    }

    /* first mount hydration --------------------------------------- */
    if (!hydratedRef.current) {
      setLines([...log].reverse().map(fmt));   // dump instantly (if any)
      prevLenRef.current = log.length;
      hydratedRef.current = true;
      return;
    }

    /* subsequent additions ---------------------------------------- */
    if (log.length > prevLenRef.current) {
      const incoming = log.slice(prevLenRef.current).map(fmt);
      queueRef.current.push(...incoming);
      prevLenRef.current = log.length;
      if (!typing) startNext();
    }
  }, [log]);

  /* cleanup on unmount */
  useEffect(() => () => clearInterval(timerRef.current), []);

  /* --------------------------------------------------------------- */
  return createPortal(
    <aside className="log">
      <h3 className="log__title">SMASH LOG</h3>

      <ul className="log__list">
        {/* cursor bottom‑most via column‑reverse */}
        <li className="log__line">
          <span className="log__cursor">{typing ? '' : '■'}</span>
        </li>

        {lines.map((html, i) => (
          <li
            key={i}
            className="log__line"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </ul>
    </aside>,
    document.body
  );
}
