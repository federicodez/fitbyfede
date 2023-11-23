"use client";

import { RemoveBtn } from "@/components";
import Link from "next/link";
import { WorkoutSession } from "@/types";
import { HiPencilAlt } from "react-icons/hi";
import React, { useRef, useEffect } from "react";

type MenuOptionsProps = {
  session: WorkoutSession;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuOptions = ({
  session,
  isModalOpen,
  setIsModalOpen,
}: MenuOptionsProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

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
  }, [menuRef]);

  return (
    <div
      ref={menuRef}
      className="absolute z-10 flex flex-row w-fit bg-[#8ebbff] rounded-md p-2 cursor-pointer right-20"
    >
      <div
        role="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex flex-col w-full gap-3 ml-5"
      >
        <Link
          rel="noopener"
          href={`/edit-workout/${session.id}`}
          className="flex flex-row"
        >
          <HiPencilAlt className="workoutlist__edit-btn text-blue-700" />
          <span className="text-lg px-1 text-[#2f3651]">Edit Workout</span>
        </Link>
        <RemoveBtn id={session.id} />
      </div>
    </div>
  );
};

export default MenuOptions;
