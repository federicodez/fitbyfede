import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteWorkout, getWorkouts } from "@/actions";
import { CurrentUser, Workout } from "@/types";

type RemoveProps = {
  id: string;
  currentUser: CurrentUser;
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
};

const RemoveBtn = ({ id, currentUser, setWorkouts }: RemoveProps) => {
  const router = useRouter();

  const removeWorkout = async () => {
    await deleteWorkout(id);
    const workouts = await getWorkouts(currentUser.id);
    if (workouts) {
      setWorkouts(workouts);
    }
    router.refresh();
  };
  return (
    <button className="remove-btn" onClick={removeWorkout}>
      <HiOutlineTrash />
    </button>
  );
};

export default RemoveBtn;
