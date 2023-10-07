import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteWorkout, getWorkouts } from "@/actions";
import { Workout } from "@/types";

type RemoveProps = {
  id: string;
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
};

const RemoveBtn = ({ id, setWorkouts }: RemoveProps) => {
  const router = useRouter();

  const removeWorkout = async () => {
    await deleteWorkout(id);
    const items = await getWorkouts();
    if (items) {
      setWorkouts(items);
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
