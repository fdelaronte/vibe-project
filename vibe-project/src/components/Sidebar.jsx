// Sidebar.jsx – v3 (cursor at bottom)
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Sidebar({ log, isOpen, toggle }) {
  const [typedLines, setTypedLines] = useState([]);
  const typingIdx = useRef(0);
  const [isTyping, setIsTyping] = useState(false);

  /* typewriter */
  useEffect(() => {
    if (!log.length) return;

    const newest = log[log.length - 1];
    const full = `> ${newest.dtg} || ${newest.platform} || ${newest.result}`;

    // prepend blank placeholder for new line
    setTypedLines(prev => ['', ...prev]);
    typingIdx.current = 0;
    setIsTyping(true);

    const id = setInterval(() => {
      typingIdx.current += 1;
      setTypedLines(prev => {
        const arr = [...prev];
        arr[0] = full.slice(0, typingIdx.current);
        return arr;
      });
      if (typingIdx.current >= full.length) {
        clearInterval(id);
        // bold platform text
        setTypedLines(prev => {
          const [first, ...rest] = prev;
          const bolded = first.replace(
            newest.platform,
            `<strong>${newest.platform}</strong>`
          );
          return [bolded, ...rest];
        });
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(id);
  }, [log]);

  /* wipe on clear‑all */
  useEffect(() => {
    if (log.length === 0) setTypedLines([]);
  }, [log.length]);

  return createPortal(
    <aside className={`log ${isOpen ? '' : 'closed'}`}>
      <button className="log__toggle" onClick={toggle}>
        {isOpen ? '<' : '>'}
      </button>

      <ul className="log__list">
        {/* cursor FIRST → appears at visual bottom */}
        <li className="log__line">
          <span className="log__cursor">{isTyping ? '' : '■'}</span>
        </li>

        {typedLines.map((line, i) => (
          <li
            key={i}
            className="log__line"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </ul>
    </aside>,
    document.body
  );
}
