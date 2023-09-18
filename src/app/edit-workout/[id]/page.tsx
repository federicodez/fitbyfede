import { EditWorkoutForm } from "@/components";
import { getWorkoutById } from "@/actions";

export default async function EditWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const workout = await getWorkoutById(id);
  return workout ? (
    <div>
      <EditWorkoutForm workout={workout} />
    </div>
  ) : null;
}
