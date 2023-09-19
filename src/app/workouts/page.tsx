import { getWorkouts, getCurrentUser } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";

const Workouts = async () => {
  try {
    const currentUser = await getCurrentUser();

    console.log({ currentUser });

    if (currentUser) {
      const workouts = await getWorkouts(currentUser.id);
      if (workouts) {
        return <WorkoutList currentUser={currentUser!} items={workouts!} />;
      } else {
        return <EmptyState />;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default Workouts;
