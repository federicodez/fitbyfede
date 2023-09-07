import { FinishWorkoutForm, Unauth } from "@/components/";
import { getMostRecentWorkout } from "@/utils";

export default async function FinishWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const workout = await getMostRecentWorkout(id);

  return workout ? (
    <>
      <Unauth>
        <FinishWorkoutForm workout={workout} />
      </Unauth>
    </>
  ) : null;
}
