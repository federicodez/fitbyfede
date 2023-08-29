"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

type RemoveProps = {
  id: string;
};

export default function RemoveBtn({ id }: RemoveProps) {
  const router = useRouter();
  const removeWorkout = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/workouts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={removeWorkout}>
      <HiOutlineTrash />
    </button>
  );
}
