import { EditWorkoutForm } from "@/components";
import { getWorkoutById } from "@/utils";

export default async function EditWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { workout } = await getWorkoutById(id);
  const { _id, exercise, lbs, reps, notes } = workout;
  return (
    <div>
      <EditWorkoutForm
        id={id}
        _id={_id}
        exercise={exercise}
        lbs={lbs}
        reps={reps}
        notes={notes}
      />
    </div>
  );
}
