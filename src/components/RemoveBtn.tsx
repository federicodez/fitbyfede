"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/actions";

type RemoveProps = {
  id: string;
};

const RemoveBtn = ({ id }: RemoveProps) => {
  const router = useRouter();

  const removeWorkout = async () => {
    await deleteSession(id);
    router.refresh();
  };
  return (
    <button className="remove-btn flex flex-row" onClick={removeWorkout}>
      <HiOutlineTrash className="text-red-500" />
      <span className="text-lg px-1 text-[#2f3651]">Delete</span>
    </button>
  );
};

export default RemoveBtn;
