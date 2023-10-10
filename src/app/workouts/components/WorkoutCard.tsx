type WorkoutCardProps = {
  sets: string[];
  lbs: number[];
  reps: number[];
};

const WorkoutCard = ({ sets, lbs, reps }: WorkoutCardProps) => {
  return (
    <div className="workout-card wrapper">
      <ul className="workout-card-list">
        {sets?.map((set: string, id: number) =>
          set.map((s, id) => (
            <li key={id} className="workout-card-item">
              <div className="workout-card__set-id">{s}</div>
              <div className="workout-card__lbs-label">lbs</div>
            </li>
          )),
        )}
      </ul>
      <ul className="workout-card-list">
        {lbs?.map((lb: number, id: number) => (
          <li key={id} className="workout-card-item">
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
};

export default WorkoutCard;
