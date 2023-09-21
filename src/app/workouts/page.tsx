import { getWorkouts } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";

const Workouts = async () => {
  try {
    const workouts = await getWorkouts();
    return workouts ? <WorkoutList items={workouts} /> : <EmptyState />;
  } catch (err) {
    console.log(err);
  }
};

export default Workouts;
