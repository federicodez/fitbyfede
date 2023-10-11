"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteWorkout, getWorkouts, deleteSession } from "@/actions";
import { Workout } from "@/types";

type RemoveProps = {
  ids: string[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  sessionId?: string;
};

const RemoveBtn = ({ ids, setWorkouts, sessionId }: RemoveProps) => {
  const router = useRouter();

  const removeWorkout = async () => {
    ids.map(async (id: string) => await deleteWorkout(id));
    if (sessionId) {
      await deleteSession(sessionId);
    }
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
