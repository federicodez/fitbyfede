"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteWorkout, getWorkouts, deleteSession } from "@/actions";
import { Workout } from "@/types";

type RemoveProps = {
  id: string;
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  workoutSessionId: string;
};

const RemoveBtn = ({ id, setWorkouts, workoutSessionId }: RemoveProps) => {
  const router = useRouter();

  const removeWorkout = async () => {
    await deleteWorkout(id);
    await deleteSession(workoutSessionId);
    const items = await getWorkouts();
    if (items) {
      setWorkouts(items);
      router.refresh();
    }
  };
  return (
    <button className="remove-btn" onClick={removeWorkout}>
      <HiOutlineTrash />
    </button>
  );
};

export default RemoveBtn;
