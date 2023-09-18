import { getWorkouts } from "@/actions";
import { WorkoutList } from "@/components";

const Workouts = async () => {
  const workouts = await getWorkouts();
  return (
    <>
      <WorkoutList items={workouts} />
    </>
  );
};

export default Workouts;
