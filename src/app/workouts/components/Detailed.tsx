"use client";

import moment from "moment";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { FaWeightHanging } from "react-icons/fa";
import { WorkoutSession } from "@/types";
import React, { useRef, useEffect } from "react";

type DetailedProps = {
  session: WorkoutSession;
  setShowWorkoutDetails: React.Dispatch<React.SetStateAction<string | boolean>>;
  isDetailsOpen: boolean;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Detailed = ({
  session,
  setShowWorkoutDetails,
  isDetailsOpen,
  setIsDetailsOpen,
}: DetailedProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDetailsOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsDetailsOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menuRef]);

  const hours = Math.floor(session.time / 360000);
  const minutes = Math.floor((session.time % 360000) / 6000);
  const seconds = Math.floor((session.time % 6000) / 100);

  const sum = session.Workout?.map(({ lbs, reps }) => {
    const lb = lbs.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    const rep = reps.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return lb * rep;
  });

  return (
    <div
      ref={menuRef}
      className={`
      fixed 
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-[#8ebbff] 
      w-96 
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div
        role="button"
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        className="flex flex-row justify-between m-2"
      >
        <button
          className="bg-[#2f3651] px-2 py-1 rounded-md"
          onClick={() => setShowWorkoutDetails(false)}
        >
          <HiX role="presentation" />
        </button>
        {session?.name}
        <Link
          rel="noopener"
          href={`/edit-workout/${session.id}`}
          className="flex flex-row"
        >
          <span className="text-2xl text-[#2f3651]">Edit</span>
        </Link>
      </div>
      <div className="flex flex-col">
        <span>{moment(session.createdAt).format("llll")}</span>
        <div className="flex flex-row justify-evenly">
          <span className="flex flex-row gap-2 justify-center items-center">
            <IoIosTimer className="w-fit" role="presentation" />
            {hours ? `${hours}:` : ""}
            {minutes.toString().padStart(2)}:
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="flex flex-row gap-2 justify-center items-center">
            <FaWeightHanging role="presentation" />
            {sum?.[0]}
          </span>
        </div>
      </div>
      <div className="flex flex-col my-4 ">
        {session.Workout?.map(({ id, name, sets, lbs, reps, notes }) => (
          <div key={id}>
            <div className="flex flex-row justify-evenly my-2">
              <div className="flex flex-col">
                <strong>{name}</strong>
                <span>{notes}</span>
              </div>
              <strong>1RM</strong>
            </div>
            <ul className="workout-card-list">
              {lbs?.map((lb: number, lbIndex: number) => (
                <li
                  key={lbIndex}
                  className="workout-card-item flex justify-evenly items-center"
                >
                  <div className="flex flex-row gap-5">
                    <div className="">{sets[lbIndex]}</div>
                    <div className="">
                      {lb
                        ? `${lb} lbs x ${reps[lbIndex]}`
                        : `${reps[lbIndex]} reps`}
                    </div>
                  </div>
                  <div>{Math.floor(lb * (1 + reps[lbIndex] / 30))}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detailed;
