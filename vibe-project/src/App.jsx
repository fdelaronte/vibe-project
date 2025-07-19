import { useEffect, useReducer, useState } from 'react';
import { targets, getRank } from './data/targets.js';
import Header from './components/Header.jsx';
import Grid from './components/Grid.jsx';
import Modal from './components/Modal.jsx';
import Sidebar from './components/Sidebar.jsx';

/* ------------------------------------------------------------------ */
/* 1 ·  STATE SHAPES & HELPERS                                         */
/* ------------------------------------------------------------------ */
const blankState = { score: 0, log: [] };

function loadSession() {
  try {
    const raw = sessionStorage.getItem('smashCounter');
    return raw ? JSON.parse(raw) : blankState;
  } catch {
    return blankState;                 // parse error → start fresh
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
  const mon = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getUTCMonth()];
  const yy  = String(d.getUTCFullYear()).slice(-2);
  return `${dd}${hh}${mm}${mon}Z${yy}`;
}

/* ------------------------------------------------------------------ */
/* 2 ·  MAIN APP                                                       */
/* ------------------------------------------------------------------ */
export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadSession);
  const [modalImg, setModalImg]   = useState(null);

  /* persist every change */
  useEffect(() => saveSession(state), [state]);

  /* helper to log a hit */
  function addLog(platform, result) {
    dispatch({
      type: 'ADD_LOG',
      payload: { dtg: formatDTG(), platform, result }
    });
  }

  return (
    <>
      <Header
        score={state.score}
        rank={getRank(state.score)}
        onReset={() => dispatch({ type: 'RESET' })}
      />

      <Grid
        targets={targets}
        onClick={(xp) => dispatch({ type: 'ADD_POINTS', payload: xp })}
        onLog={addLog}
        onView={setModalImg}
      />

      <Modal imgSrc={modalImg} onClose={() => setModalImg(null)} />
      <Sidebar log={state.log} />
    </>
  );
}
