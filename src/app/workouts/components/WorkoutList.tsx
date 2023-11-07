"use client";

import { useState } from "react";
import Sessions from "./Sessions";
import Detailed from "./Detailed";
import MenuOptions from "./MenuOptions";
import Link from "next/link";
import { HiPencilAlt, HiX } from "react-icons/hi";
import moment from "moment";
import { Workout, WorkoutSession } from "@/types";
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
      <Link href="/search-workout" className="home-link">
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
            <div className="wrapper my-2 p-2 rounded-lg shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
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
                <div onClick={() => setShowOptions(session.id)}>
                  <SlOptions />
                </div>
              </div>
              <div onClick={() => setShowWorkoutDetails(session.id)}>
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
