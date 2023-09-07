import { EditWorkoutForm, Unauth } from "@/components";
import { getWorkoutById } from "@/utils";

export default async function EditWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const workout = await getWorkoutById(id);
  return workout ? (
    <div>
      <Unauth>
        <EditWorkoutForm workout={workout} />
      </Unauth>
    </div>
  ) : null;
}
