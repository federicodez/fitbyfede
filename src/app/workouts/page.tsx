import { getWorkouts } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";

const Workouts = async () => {
  try {
    const workouts = await getWorkouts();
    if (workouts) {
      return <WorkoutList items={workouts!} />;
    } else {
      return <EmptyState />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default Workouts;
