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
              <Detailed
                session={session}
                setShowWorkoutDetails={setShowWorkoutDetails}
              />
            </div>
            <div className="wrapper my-2 p-2 rounded-lg border-[#8ebbff] border-4 p-color">
              <div className="flex justify-between">
                {moment(session.createdAt).format("dddd, MMM Do")}
                <div
                  className={
                    showOptions === session.id ? "absolute w-full" : "hidden"
                  }
                >
                  <MenuOptions
                    session={session}
                    setShowOptions={setShowOptions}
                  />
                </div>
                <div role="button" onClick={() => setShowOptions(session.id)}>
                  <SlOptions
                    role="presentation"
                    className="text-[#8ebbff] text-xl mr-2"
                  />
                </div>
              </div>
              <div
                role="button"
                onClick={() => setShowWorkoutDetails(session.id)}
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
