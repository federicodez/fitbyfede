import { EditWorkoutForm } from "@/components";
import { getWorkoutById } from "@/utils";

export default async function EditWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const workout = await getWorkoutById(id);
  console.log({ workout });
  return (
    <div>
      <EditWorkoutForm workout={workout} />
    </div>
  );
}
