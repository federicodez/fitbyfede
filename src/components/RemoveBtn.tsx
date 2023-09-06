"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteWorkout } from "@/utils";

type RemoveProps = {
  id: string;
};

export default function RemoveBtn({ id }: RemoveProps) {
  const router = useRouter();
  const removeWorkout = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const deleted = await deleteWorkout(id);
      router.refresh();
    }
  };
  return (
    <button onClick={removeWorkout}>
      <HiOutlineTrash />
    </button>
  );
}
