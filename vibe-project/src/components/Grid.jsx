// src/components/Grid.jsx
import TargetCard from './TargetCard.jsx';    // ← MAKE SURE THIS LINE EXISTS

export default function Grid({ targets, onClick, onView }) {
  return (
    <section className="grid">
      {targets.map((t) => (
        <TargetCard
          key={t.id}
          data={t}
          onClick={onClick}
          onView={onView}
        />
      ))}
    </section>
  );
}
