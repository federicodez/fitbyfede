import { getWorkoutsBySessionId } from "@/actions";
import FinishWorkoutForm from "../components/FinishWorkoutForm";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workouts = await getWorkoutsBySessionId(id);

    return workouts ? (
      <FinishWorkoutForm sessionId={id} items={workouts} />
    ) : null;
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
