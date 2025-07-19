// src/App.jsx
import { useReducer, useState } from 'react';
import { targets, getRank } from './data/targets.js';
import Header from './components/Header.jsx';
import Grid from './components/Grid.jsx';
import Modal from './components/Modal.jsx';

/* ------------------------------------------------------------------ */
/*  1.  SCORE STATE                                                   */
/* ------------------------------------------------------------------ */
const initialState = { score: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_POINTS':
      return { score: state.score + action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  2.  APP COMPONENT                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalImg, setModalImg] = useState(null);   // for the image viewer

  return (
    <>
      {/* header */}
      <Header
        score={state.score}
        rank={getRank(state.score)}
        onReset={() => dispatch({ type: 'RESET' })}
      />

      {/* target grid */}
      <Grid
        targets={targets}
        onClick={(xp) => dispatch({ type: 'ADD_POINTS', payload: xp })}
        onView={setModalImg}                      // pass opener for modal
      />

      {/* full‑size image modal */}
      <Modal imgSrc={modalImg} onClose={() => setModalImg(null)} />
    </>
  );
}
