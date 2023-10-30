import {
  getWorkoutsBySessionId,
  getMostRecentWorkouts,
  getSessionById,
  getPreviousWorkout,
} from "@/actions";
import FinishWorkoutForm from "../components/FinishWorkoutForm";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workouts = await getWorkoutsBySessionId(id);
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    const session = await getSessionById(id);

    if (workouts && session?.name) {
      const previous = (await getPreviousWorkout(workouts)) || null;
      return (
        <FinishWorkoutForm
          previous={previous}
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
