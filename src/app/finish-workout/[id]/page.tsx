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
    // console.log("session: ", session);

    if (workouts && session) {
      const previous = (await getPreviousWorkout(workouts)) || [];
      return previous ? (
        <FinishWorkoutForm
          previous={previous}
          initialSession={session}
          sessionId={id}
          items={workouts}
          recentWorkouts={recentWorkouts}
        />
      ) : null;
    }
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
