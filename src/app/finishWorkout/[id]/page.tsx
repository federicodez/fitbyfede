import { FinishWorkoutForm } from "@/components/";
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
      <FinishWorkoutForm workout={workout} />
    </>
  ) : (
    <p>loading...</p>
  );
}
