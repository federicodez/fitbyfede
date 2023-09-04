import { FinishWorkoutForm } from "@/components/";
import { getMostRecentWorkout } from "@/utils";

export default async function FinishWorkout() {
  // const exercise = exercise.replaceAll("%20", " ");

  const { workout } = await getMostRecentWorkout();

  return (
    <div>
      <FinishWorkoutForm workout={workout} />
    </div>
  );
}
