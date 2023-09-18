import { FinishWorkoutForm } from "@/components/";
import { getMostRecentWorkout } from "@/actions";

export default async function FinishWorkout({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const workout = await getMostRecentWorkout(id);

  return workout ? (
    <>
      <FinishWorkoutForm workout={workout} />
    </>
  ) : null;
}
