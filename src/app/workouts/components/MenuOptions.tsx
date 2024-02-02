"use client";

import { RemoveBtn } from "@/components";
import Link from "next/link";
import { WorkoutSession } from "@/types";
import { HiPencilAlt } from "react-icons/hi";
import React, { useRef, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteSession } from "@/actions/workouts";
import { useRouter } from "next/navigation";

type MenuOptionsProps = {
  session: WorkoutSession;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showOptions: string | boolean;
};

const MenuOptions = ({
  session,
  isModalOpen,
  setIsModalOpen,
  showOptions,
}: MenuOptionsProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isModalOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menuRef, setIsModalOpen, isModalOpen]);

  const removeWorkout = async (id: string) => {
    await deleteSession(id);
    router.refresh();
  };

  return (
    showOptions === session.id && (
      <div
        ref={menuRef}
        className="absolute z-10 w-fit bg-[#8ebbff] rounded-md right-10 md:right-40 md:mr-40 cursor-pointer border"
      >
        <div
          role="button"
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex flex-col w-full gap-3 m-2"
        >
          <Link
            rel="noopener"
            href={`/edit-workout/${session.id}`}
            className="flex flex-row"
          >
            <HiPencilAlt className="workoutlist__edit-btn text-blue-700" />
            <span className="text-lg px-1 text-[#2f3651]">Edit Workout</span>
          </Link>

          <div
            className="flex flex-row items-center gap-2 text-xl text-red-500"
            onClick={() => removeWorkout(session.id)}
          >
            <HiOutlineTrash role="none" />
            <span className="text-lg px-1 text-[#2f3651]">Delete</span>
          </div>
          {/* <RemoveBtn id={session.id} /> */}
        </div>
      </div>
    )
  );
};

export default MenuOptions;
