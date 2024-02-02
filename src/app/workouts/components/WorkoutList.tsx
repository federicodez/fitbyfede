"use client";

import { useState, useEffect } from "react";
import Sessions from "./Sessions";
import Detailed from "./Detailed";
import MenuOptions from "./MenuOptions";
import Link from "next/link";
import moment from "moment";
import { WorkoutSession, CurrentUser } from "@/types";
import { SlOptions } from "react-icons/sl";

type WorkoutListProps = {
  initialSessions: WorkoutSession[];
  currentUser: CurrentUser;
};

const WorkoutList = ({ initialSessions, currentUser }: WorkoutListProps) => {
  const [sessions, setSessions] = useState(initialSessions);
  const [showOptions, setShowOptions] = useState<string | boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState<
    string | boolean
  >(false);

  useEffect(() => {
    setSessions((prev) =>
      !currentUser?.subscription ? prev.slice(-50) : prev,
    );
  }, [currentUser?.subscription]);

  return (
    <section>
      <Link
        rel="noopener"
        aria-label="start a workout"
        href="/search-workout"
        className="flex justify-center items-center font-bold rounded-full w-80 mx-auto my-5 bg-[#8ebbff] text-[#2f3651] sm:mx-auto"
      >
        Start a Workout
      </Link>
      <Link
        rel="noopener"
        aria-label="start a workout"
        href="/train-with-ai"
        className="flex justify-center items-center font-bold rounded-full w-80 mx-auto my-5 text-[#8ebbff] bg-[#2f3651] sm:mx-auto"
      >
        Train with AI
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
                  className="px-3 bg-[#8ebbff] text-[#2f3651] rounded-md mr-px"
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
