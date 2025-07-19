export default function Header({ score, rank, onReset }) {
  return (
    <header className="header">
      <div className="header__left">
        <span className="header__rank">{rank}:</span>
        <span className="header__score">{score} XP</span>
      </div>

      <h1 className="header__title">SMASH COUNTER</h1>

      <button type="button" className="header__reset" onClick={onReset}>
        Clear All
      </button>
    </header>
  );
}
