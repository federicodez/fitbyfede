import {
  getWorkoutsBySessionId,
  getMostRecentWorkouts,
  getSessionById,
} from "@/actions";
import FinishWorkoutForm from "../components/FinishWorkoutForm";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workouts = await getWorkoutsBySessionId(id);
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    const session = await getSessionById(id);

    if (workouts && session?.name) {
      return (
        <FinishWorkoutForm
          session={session}
          sessionId={id}
          items={workouts}
          recentWorkouts={recentWorkouts}
        />
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
