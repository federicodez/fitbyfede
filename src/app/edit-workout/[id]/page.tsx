import { getWorkoutById } from "@/actions";
import EditWorkoutForm from "../components/EditWorkoutForm";

const EditWorkout = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const workout = await getWorkoutById(id);
    return workout ? <EditWorkoutForm workout={workout} /> : null;
  } catch (err) {
    console.log(err);
  }
};

export default EditWorkout;
