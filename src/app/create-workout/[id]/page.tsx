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

    if (workouts && session) {
      const previous = (await getPreviousWorkout(workouts)) || [];
      return (
        previous && (
          <FinishWorkoutForm
            previous={previous}
            initialSession={session}
            recentWorkouts={recentWorkouts}
          />
        )
      );
    }
  } catch (error) {
    console.log("create error", error);
  }
};

export default FinishWorkout;
