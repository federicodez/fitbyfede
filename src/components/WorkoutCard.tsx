interface WorkoutCardProps {
  lbs: [number];
  reps: [number];
}

export default function WorkoutCard({ lbs, reps }: WorkoutCardProps) {
  return (
    <div className="workout-card">
      <div className="workout-card-list">
        {lbs?.map((lb: number, id: number) => (
          <ul>
            <li key={id}>
              <pre>
                {(id += 1)} {lb}
                <i> lbs </i> x{" "}
              </pre>
            </li>
          </ul>
        ))}
      </div>
      <div className="workout-card-list"></div>
      <div className="workout-card-list">
        {reps?.map((rep: number, id: number) => (
          <ul>
            <li key={id}>{rep}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
