import { getWorkoutsBySessionId } from "@/actions";
import EditWorkoutForm from "../components/EditWorkoutForm";

const EditWorkout = async ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;

  try {
    const workouts = await getWorkoutsBySessionId(sessionId);
    return workouts ? <EditWorkoutForm items={workouts} /> : null;
  } catch (err) {
    console.log(err);
  }
};

export default EditWorkout;
