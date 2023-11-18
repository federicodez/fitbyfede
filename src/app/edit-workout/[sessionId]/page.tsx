import {
  getMostRecentWorkouts,
  getPreviousWorkout,
  getSessionById,
  getWorkoutsBySessionId,
} from "@/actions/workouts";
import dynamic from "next/dynamic";
const EditWorkoutForm = dynamic(() => import("../components/EditWorkoutForm"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

const EditWorkout = async ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;

  try {
    const workouts = await getWorkoutsBySessionId(sessionId);
    const recentWorkouts = (await getMostRecentWorkouts()) || [];

    const session = await getSessionById(sessionId);

    if (workouts && session) {
      const previous = (await getPreviousWorkout(workouts)) || [];
      return (
        <EditWorkoutForm
          previous={previous}
          initialSession={session}
          recentWorkouts={recentWorkouts}
        />
      );
    }
  } catch (err) {
    console.log("edit error", err);
  }
};

export default EditWorkout;
