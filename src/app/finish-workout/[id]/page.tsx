import { FinishWorkoutForm } from "@/components/";
import { getMostRecentWorkout } from "@/actions";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const workout = await getMostRecentWorkout(id);

  console.log("most recent: ", workout);

  return workout ? <FinishWorkoutForm workout={workout} /> : null;
};

export default FinishWorkout;
