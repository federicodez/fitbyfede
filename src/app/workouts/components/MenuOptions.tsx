import { RemoveBtn } from "@/components";
import Link from "next/link";
import { WorkoutSession } from "@/types";
import { HiPencilAlt, HiX } from "react-icons/hi";
import React from "react";

type MenuOptionsProps = {
  session: WorkoutSession;
  setShowOptions: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const MenuOptions = ({ session, setShowOptions }: MenuOptionsProps) => (
  <div className="absolute z-10 flex flex-row w-fit bg-white rounded-md p-2 cursor-pointer right-20">
    <button
      onClick={() => setShowOptions(false)}
      className="bg-gray-300 w-8 px-2 h-fit rounded-md"
    >
      <HiX />
    </button>
    <div className="flex flex-col w-full gap-3 ml-5">
      <Link href={`/edit-workout/${session.id}`} className="flex flex-row">
        <HiPencilAlt className="workoutlist__edit-btn text-blue-700" />
        <span className="text-lg px-1">Edit Workout</span>
      </Link>
      <RemoveBtn id={session.id} />
    </div>
  </div>
);

export default MenuOptions;
