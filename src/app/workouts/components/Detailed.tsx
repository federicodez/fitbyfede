"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { FaWeightHanging } from "react-icons/fa";
import { WorkoutSession } from "@/types";

type DetailedProps = {
  session: WorkoutSession;
  setShowWorkoutDetails: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const Detailed = ({ session, setShowWorkoutDetails }: DetailedProps) => {
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
      className={`
      fixed 
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-gray-100 
      w-[450px] 
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div className="flex flex-row justify-between m-2">
        <button
          className="bg-gray-400 px-2 py-1 rounded-md"
          onClick={() => setShowWorkoutDetails(false)}
        >
          <HiX />
        </button>
        {session?.name}
        <Link href={`/edit-workout/${session.id}`} className="flex flex-row">
          <span className="text-lg text-blue-500">Edit</span>
        </Link>
      </div>
      <div className="flex flex-col">
        <span>{moment(session.createdAt).format("llll")}</span>
        <div className="flex flex-row justify-evenly">
          <span className="flex flex-row gap-2 justify-center items-center">
            <IoIosTimer className="w-fit" />
            {hours ? `${hours}:` : ""}
            {minutes.toString().padStart(2)}:
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="flex flex-row gap-2 justify-center items-center">
            <FaWeightHanging />
            {sum?.[0]}
          </span>
        </div>
      </div>
      <div className="flex flex-col my-4 ">
        {session.Workout?.map(({ id, name, sets, lbs, reps }) => (
          <div key={id}>
            <div className="flex flex-row justify-evenly my-2">
              <strong>{name}</strong>
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
