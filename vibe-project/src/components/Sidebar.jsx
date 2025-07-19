// Sidebar.jsx – v6 (typing queue, never truncates)
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TYPE_SPEED = 25;         // ms per character

const fmt = ({ dtg, platform, result }) =>
  `> ${dtg} || <strong>${platform}</strong> || ${result}`;

export default function Sidebar({ log }) {
  /* rendered HTML strings, newest at index 0 due to column‑reverse */
  const [lines, setLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  /* mutable refs */
  const queueRef   = useRef([]);   // pending formatted lines
  const charIdxRef = useRef(0);
  const prevLenRef = useRef(0);
  const timerRef   = useRef(null);

  /* helper: kick off typing for the next queued line */
  const startNext = () => {
    if (!queueRef.current.length) {
      setIsTyping(false);
      return;
    }
    const full = queueRef.current.shift();
    charIdxRef.current = 0;
    setIsTyping(true);
    setLines(prev => ['', ...prev]);          // placeholder line

    timerRef.current = setInterval(() => {
      charIdxRef.current += 1;
      setLines(prev => {
        const arr = [...prev];
        arr[0] = full.slice(0, charIdxRef.current);
        return arr;
      });
      if (charIdxRef.current >= full.length) {
        clearInterval(timerRef.current);
        setLines(prev => {
          const [_, ...rest] = prev;
          return [full, ...rest];
        });
        startNext();                         // recurse for next queued line
      }
    }, TYPE_SPEED);
  };

  /* watch log prop */
  useEffect(() => {
    /* RESET */
    if (log.length === 0) {
      clearInterval(timerRef.current);
      setLines([]);
      queueRef.current = [];
      prevLenRef.current = 0;
      setIsTyping(false);
      return;
    }

    /* FIRST HYDRATION */
    if (prevLenRef.current === 0) {
      setLines([...log].reverse().map(fmt));      // instant dump
      prevLenRef.current = log.length;
      return;
    }

    /* NEW ENTRIES */
    if (log.length > prevLenRef.current) {
      const newItems = log.slice(prevLenRef.current).map(fmt);
      queueRef.current.push(...newItems);         // maintain order
      prevLenRef.current = log.length;
      if (!isTyping) startNext();                 // begin if idle
    }
  }, [log]);

  /* cleanup on unmount */
  useEffect(() => () => clearInterval(timerRef.current), []);

  /* render */
  return createPortal(
    <aside className="log">
      <ul className="log__list">
        {/* cursor bottom‑most */}
        <li className="log__line">
          <span className="log__cursor">{isTyping ? '' : '■'}</span>
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
