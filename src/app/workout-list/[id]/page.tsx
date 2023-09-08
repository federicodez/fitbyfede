import { WorkoutList } from "@/components";
import { getWorkoutById, getWorkouts } from "@/utils";

export default async function Workouts() {
  const workouts = await getWorkouts();
  return <WorkoutList workouts={workouts} />;
}
