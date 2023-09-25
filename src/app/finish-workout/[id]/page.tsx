import { WorkoutForm } from "@/components";
import { getWorkoutById } from "@/actions";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workout = await getWorkoutById(id);
    return workout ? (
      <WorkoutForm formtype={"Create Workout"} workout={workout} />
    ) : null;
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
