import { getWorkouts, getCurrentUser } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";

const Workouts = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const workouts = await getWorkouts(currentUser.id);
    if (workouts) {
      return <WorkoutList currentUser={currentUser} items={workouts!} />;
    } else {
      return <EmptyState />;
    }
  }
};

export default Workouts;
