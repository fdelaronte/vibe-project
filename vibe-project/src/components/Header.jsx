export default function Header({ score, rank, onReset }) {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">
            <span className="header__title--one">SMASH </span>
            <span className="header__title--two">COUNTER</span>
        </h1>
      </div>
      <div className="header__right">
        <span className="header__rankscore">
          {rank}: {score} XP
        </span>
        <button type="button" className="header__reset" onClick={onReset}>
          Clear All
        </button>
      </div>
    </header>
  );
}
