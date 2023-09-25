import { WorkoutForm } from "@/components";
import { getWorkoutById } from "@/actions";

const EditWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workout = await getWorkoutById(id);
    return workout ? (
      <WorkoutForm formtype="Update Workout" workout={workout} />
    ) : null;
  } catch (err) {
    console.log(err);
  }
};

export default EditWorkout;
