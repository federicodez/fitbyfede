import { getCurrentUser } from "@/actions";
import CreateWorkoutForm from "./components/CreateWorkoutForm";

const CreateWorkout = async () => {
  try {
    const currentUser = await getCurrentUser();
    return (
      <>
        <CreateWorkoutForm currentUser={currentUser} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default CreateWorkout;
