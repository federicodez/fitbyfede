import FinishWorkoutForm from "../components/FinishWorkoutForm";
import { getWorkoutById } from "@/actions";

const FinishWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workout = await getWorkoutById(id);
    return workout ? <FinishWorkoutForm workout={workout} /> : null;
  } catch (error) {
    console.log(error);
  }
};

export default FinishWorkout;
