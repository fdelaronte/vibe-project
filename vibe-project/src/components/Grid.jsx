// Grid.jsx – forwards onLog / onView to each card
import TargetCard from './TargetCard.jsx';

export default function Grid({ targets, onClick, onLog, onView }) {
  return (
    <section className="grid">
      {targets.map((t) => (
        <TargetCard
          key={t.id}
          data={t}
          onClick={onClick}
          onLog={onLog}     // NEW
          onView={onView}   // (modal zoom)
        />
      ))}
    </section>
  );
}
