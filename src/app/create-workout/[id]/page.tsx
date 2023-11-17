import {
  getWorkoutsBySessionId,
  getMostRecentWorkouts,
  getSessionById,
  getPreviousWorkout,
} from "@/actions";
import dynamic from "next/dynamic";
const CreateWorkoutForm = dynamic(
  () => import("../components/CreateWorkoutForm"),
  {
    loading: () => <p className="animate-bounce">Loading...</p>,
  },
);

const CreateWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workouts = await getWorkoutsBySessionId(id);
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    const session = await getSessionById(id);

    if (workouts && session) {
      const previous = (await getPreviousWorkout(workouts)) || [];
      return (
        previous && (
          <CreateWorkoutForm
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

export default CreateWorkout;
