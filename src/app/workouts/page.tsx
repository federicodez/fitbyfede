import { getWorkouts, getCurrentUser } from "@/actions";
import { WorkoutList } from "@/components";

const Workouts = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const workouts = await getWorkouts(currentUser.id);
    return <WorkoutList items={workouts!} />;
  }
};

export default Workouts;
