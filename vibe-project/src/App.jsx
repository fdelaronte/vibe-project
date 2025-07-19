/* ================================================================
   src/App.jsx  —  full file with guard so Rank‑Up overlay is
   suppressed when the user hits “Clear All” (score resets to 0).
   ================================================================ */
import { useEffect, useReducer, useRef, useState } from 'react';
import { targets, getRank } from './data/targets.js';
import Header from './components/Header.jsx';
import Grid from './components/Grid.jsx';
import Modal from './components/Modal.jsx';
import Sidebar from './components/Sidebar.jsx';
import RankUpOverlay from './components/RankUpOverlay.jsx';

/* ------------------------------------------------------------------
   1 ·  STATE, STORAGE, HELPERS
   ------------------------------------------------------------------ */
const blankState = { score: 0, log: [] };

function loadSession() {
  try {
    const raw = sessionStorage.getItem('smashCounter');
    return raw ? JSON.parse(raw) : blankState;
  } catch {
    return blankState;
  }
}
function saveSession(state) {
  sessionStorage.setItem('smashCounter', JSON.stringify(state));
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_POINTS':
      return { ...state, score: state.score + action.payload };
    case 'ADD_LOG':
      return { ...state, log: [...state.log, action.payload] };
    case 'RESET':
      return blankState;
    default:
      return state;
  }
}

function formatDTG(d = new Date()) {
  const dd  = String(d.getUTCDate()).padStart(2, '0');
  const hh  = String(d.getUTCHours()).padStart(2, '0');
  const mm  = String(d.getUTCMinutes()).padStart(2, '0');
  const mon = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG',
               'SEP','OCT','NOV','DEC'][d.getUTCMonth()];
  const yy  = String(d.getUTCFullYear()).slice(-2);
  return `${dd}${hh}${mm}${mon}Z${yy}`;
}

/* ------------------------------------------------------------------
   2 ·  MAIN APP
   ------------------------------------------------------------------ */
export default function App() {
  const [state, dispatch]   = useReducer(reducer, undefined, loadSession);
  const [modalImg, setImg]  = useState(null);
  const [rankFx, setRankFx] = useState(null);           // overlay flag
  const prevRank = useRef(getRank(state.score));        // last known rank

  /* persist score + log to sessionStorage */
  useEffect(() => saveSession(state), [state]);

  /* show promotion overlay on rank change (but not on reset) */
  useEffect(() => {
    /* short‑circuit if score is 0  →  user just hit “Clear All” */
    if (state.score === 0) {
      prevRank.current = getRank(0);
      return;
    }

    const currentRank = getRank(state.score);
    if (currentRank !== prevRank.current) {
      prevRank.current = currentRank;
      setRankFx(currentRank);                // overlay self‑dismisses
    }
  }, [state.score]);

  /* helper to append a log entry */
  function addLog(platform, result) {
    dispatch({
      type: 'ADD_LOG',
      payload: { dtg: formatDTG(), platform, result }
    });
  }

  return (
    <>
      {rankFx && (
        <RankUpOverlay rank={rankFx} onDone={() => setRankFx(null)} />
      )}

      <Header
        score={state.score}
        rank={getRank(state.score)}
        onReset={() => dispatch({ type: 'RESET' })}
      />

      <Grid
        targets={targets}
        onClick={(xp) => dispatch({ type: 'ADD_POINTS', payload: xp })}
        onLog={addLog}
        onView={setImg}
      />

      <Modal imgSrc={modalImg} onClose={() => setImg(null)} />
      <Sidebar log={state.log} />
    </>
  );
}
