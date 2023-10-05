import { getWorkoutsBySessionId } from "@/actions";
import WorkoutList from "../components/WorkoutList";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workouts = await getWorkoutsBySessionId(id);

    return workouts ? <WorkoutList sessionId={id} items={workouts} /> : null;
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
