"use client";

import { useState } from "react";
import Sessions from "./Sessions";
import Detailed from "./Detailed";
import MenuOptions from "./MenuOptions";
import Link from "next/link";
import moment from "moment";
import { WorkoutSession } from "@/types";
import { SlOptions } from "react-icons/sl";

type WorkoutListProps = {
  sessions: WorkoutSession[];
};

const WorkoutList = ({ sessions }: WorkoutListProps) => {
  const [showOptions, setShowOptions] = useState<string | boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState<
    string | boolean
  >(false);

  return (
    <section>
      <Link
        rel="noopener"
        aria-label="start a workout"
        href="/search-workout"
        className={`
          flex 
          justify-center 
          items-center 
          border-2 
          font-bold 
          rounded-full
          w-80
          mx-auto
          my-5
          bg-[#8ebbff]
          text-[#495057]
          sm:mx-auto
        `}
      >
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {sessions?.map((session) => (
          <div key={session.id} className="wrapper">
            <div
              className={
                showWorkoutDetails === session.id ? "relative w-full" : "hidden"
              }
            >
              {isDetailsOpen && (
                <Detailed
                  session={session}
                  setShowWorkoutDetails={setShowWorkoutDetails}
                  isDetailsOpen={isDetailsOpen}
                  setIsDetailsOpen={setIsDetailsOpen}
                />
              )}
            </div>
            <div className="wrapper my-2 p-2 rounded-lg border-[#8ebbff] border p-color">
              <div className="flex justify-between">
                {moment(session.createdAt).format("dddd, MMM Do")}
                <button
                  className="px-4 bg-[#8ebbff] text-[#2f3651] text-xl rounded-md mr-px"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setShowOptions(session.id);
                  }}
                >
                  {isModalOpen && (
                    <MenuOptions
                      session={session}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      showOptions={showOptions}
                    />
                  )}
                  <SlOptions role="none" />
                </button>
              </div>
              <div
                role="button"
                onClick={() => {
                  setIsDetailsOpen(!isDetailsOpen);
                  setShowWorkoutDetails(session.id);
                }}
              >
                <Sessions session={session} />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default WorkoutList;
