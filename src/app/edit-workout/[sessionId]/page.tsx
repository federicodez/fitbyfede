import { getSessionById, getWorkoutsBySessionId } from "@/actions";
import EditWorkoutForm from "../components/EditWorkoutForm";

const EditWorkout = async ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;

  try {
    const workouts = await getWorkoutsBySessionId(sessionId);

    const session = await getSessionById(sessionId);

    if (workouts && session) {
      return <EditWorkoutForm items={workouts} session={session} />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default EditWorkout;
