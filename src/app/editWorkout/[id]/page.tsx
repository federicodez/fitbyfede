import EditWorkoutForm from "@/components/EditWorkoutForm";
import { getWorkoutById } from "@/utils";

export default async function EditWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { workout } = await getWorkoutById(id);
  const { exercise, lbs, reps } = workout;
  return (
    <div>
      <EditWorkoutForm id={id} exercise={exercise} lbs={lbs} reps={reps} />
    </div>
  );
}
