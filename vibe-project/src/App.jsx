import { useReducer, useState } from 'react';
import { targets, getRank } from './data/targets.js';
import Header from './components/Header.jsx';
import Grid from './components/Grid.jsx';
import Modal from './components/Modal.jsx';
import Sidebar from './components/Sidebar.jsx';

const initialState = {
  score: 0,
  log: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_POINTS':
      return { ...state, score: state.score + action.payload };
    case 'ADD_LOG':
      return { ...state, log: [...state.log, action.payload] };
    case 'RESET':
      return initialState;
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalImg, setModalImg] = useState(null);
  const [sidebarOpen, setSidebar] = useState(true);        // default OPEN

  function addLog(platform, result) {
    dispatch({
      type: 'ADD_LOG',
      payload: { dtg: formatDTG(), platform, result }
    });
  }

  // inside App.jsx render (...)
return (
  <>
    {/* everything that scrolls lives inside .page  */}
    <div className="page">
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
    </div>

    {/* fixed log bar */}
    <Sidebar
      log={state.log}
      isOpen={sidebarOpen}
      toggle={() => setSidebar(!sidebarOpen)}
    />

    <Modal imgSrc={modalImg} onClose={() => setModalImg(null)} />
  </>
);

}
