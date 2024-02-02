"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { deleteSession } from "@/actions/workouts";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const removeWorkout = async () => {
    await deleteSession(id);
    router.refresh();
  };
  return (
    <div
      className="flex flex-row items-center gap-2 text-xl text-red-500"
      onClick={removeWorkout}
    >
      <HiOutlineTrash role="none" />
      <span className="text-lg px-1 text-[#2f3651]">Delete</span>
    </div>
  );
};

export default RemoveBtn;
