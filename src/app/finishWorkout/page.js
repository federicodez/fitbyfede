import { FinishWorkoutForm } from "@/components/";
import { getMostRecentWorkout } from "@/utils";
import { prisma } from "@/db";

export default async function FinishWorkout() {
  // const exercise = exercise.replaceAll("%20", " ");

  const workout = await prisma.workout.findMany();

  return workout.length ? (
    <div>
      <FinishWorkoutForm workout={workout} />
    </div>
  ) : (
    <div>
      <p>No workouts</p>
    </div>
  );
}
