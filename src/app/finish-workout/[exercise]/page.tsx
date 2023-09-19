import { FinishWorkoutForm } from "@/components/";
import { getCurrentUser, getMostRecentWorkout } from "@/actions";

const FinishWorkout = async ({ params }: { params: { exercise: string } }) => {
  const { exercise } = params;

  const currentUser = await getCurrentUser();

  // const workout = await getMostRecentWorkout(id);

  // console.log("most recent: ", workout);

  // return workout ? <FinishWorkoutForm workout={workout} /> : null;
  return <FinishWorkoutForm currentUser={currentUser!} exercise={exercise} />;
};

export default FinishWorkout;
