import {
  getWorkoutsBySessionId,
  getMostRecentWorkouts,
  getSessionById,
  getPreviousWorkout,
} from "@/actions/workouts";
import dynamic from "next/dynamic";
import LoadingModal from "@/components/modals/LoadingModal";
const CreateWorkoutForm = dynamic(
  () => import("../components/CreateWorkoutForm"),
  {
    loading: () => <LoadingModal />,
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
