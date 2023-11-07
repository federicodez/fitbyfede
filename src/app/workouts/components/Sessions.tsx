import { WorkoutSession } from "@/types";

type SessionsProps = {
  session: WorkoutSession;
};

const Sessions = ({ session }: SessionsProps) => {
  return (
    <>
      <strong className="flex flex-start">Exercise</strong>
      {session?.Workout?.map((workout) => (
        <div key={workout.id} className="flex flex-row gap-2">
          <div className="workout-card-list">{workout.sets.length}</div>
          <span>x</span>
          <span>{workout.name}</span>
        </div>
      ))}
    </>
  );
};
export default Sessions;
