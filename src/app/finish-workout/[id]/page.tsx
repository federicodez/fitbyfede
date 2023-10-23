import { getWorkoutsBySessionId, getMostRecentWorkouts } from "@/actions";
import FinishWorkoutForm from "../components/FinishWorkoutForm";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workouts = await getWorkoutsBySessionId(id);
    const recentWorkouts = (await getMostRecentWorkouts()) || [];

    return workouts ? (
      <FinishWorkoutForm
        sessionId={id}
        items={workouts}
        recentWorkouts={recentWorkouts}
      />
    ) : null;
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
