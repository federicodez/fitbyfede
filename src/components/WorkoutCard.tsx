interface WorkoutCardProps {
  lbs: [number];
  reps: [number];
}

export default function WorkoutCard({ lbs, reps }: WorkoutCardProps) {
  return (
    <div className="workout-card wrapper">
      <ul className="workout-card-list">
        {lbs?.map((lb: number, id: number) => (
          <li key={id} className="workout-card-item">
            <div className="workout-card__set-id">{(id += 1)}</div>
            <div className="workout-card__lbs">{lb}</div>
            <div className="workout-card__lbs-label">lbs</div>
          </li>
        ))}
      </ul>
      <ul className="workout-card-list">
        {reps?.map((rep: number, id: number) => (
          <li key={id} className="workout-card-item">
            <div className="workout-card__X">x</div>
            <div className="workout-card__reps">{rep}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
