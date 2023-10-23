type SessionsProps = {
  ids: any[];
  exercises: {
    [key: string]: string;
  };
  sets: {
    [key: string]: string[];
  };
  lbs: {
    [key: string]: number[];
  };
  reps: {
    [key: string]: number[];
  };
  sessionId?: string;
};

const Sessions = ({ ids, exercises, sets, lbs, reps }: SessionsProps) => {
  return (
    <div>
      <strong className="flex flex-start">Exercise</strong>
      {ids?.reverse().map((id: string, idIndex: number) => (
        <div key={idIndex} className="flex-1 flex flex-row gap-2 my-2">
          <div className="workout-card-list">{sets[id].length}</div>
          <span>x</span>
          <span>{exercises[id]}</span>
        </div>
      ))}
    </div>
  );
};
export default Sessions;
