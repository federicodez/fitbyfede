import {
  getMostRecentWorkouts,
  getSessionById,
  getWorkoutsBySessionId,
} from "@/actions";
import EditWorkoutForm from "../components/EditWorkoutForm";

const EditWorkout = async ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;

  try {
    const workouts = await getWorkoutsBySessionId(sessionId);
    const recentWorkouts = (await getMostRecentWorkouts()) || [];

    const session = await getSessionById(sessionId);

    if (workouts && session?.time) {
      return (
        <EditWorkoutForm
          items={workouts}
          session={session}
          recentWorkouts={recentWorkouts}
        />
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export default EditWorkout;
