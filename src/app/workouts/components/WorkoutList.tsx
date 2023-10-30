"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import Sessions from "./Sessions";
import Detailed from "./Detailed";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { Workout, WorkoutSession } from "@/types";
import { SlOptions } from "react-icons/sl";
import { getSessionById } from "@/actions";

type WorkoutListProps = {
  items: Workout[];
  sessions: WorkoutSession[];
};

type Groups = {
  [key: string]: Workout[];
};

type Session = {
  sessionId?: string;
  date: Date;
  ids: any[];
  exercises: {
    [key: string]: string;
  };
  sets: {
    [key: string]: string[];
  };
  lbs: {
    [key: string]: number[];
  };
  reps: {
    [key: string]: number[];
  };
};

const WorkoutList = ({ items, sessions }: WorkoutListProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>(items);
  const [showSessions, setShowSessions] = useState(true);
  const [showOptions, setShowOptions] = useState<string | boolean>(false);
  const [showWorkouts, setShowWorkouts] = useState<string | boolean>(false);
  const [session, setSession] = useState<WorkoutSession | null>(null);

  const selectedSession = (sessionId: string) => {
    const selected = sessions.filter((session) => session.id === sessionId);
    setSession(selected[0]);
  };

  const sorted = workouts?.reduce((groups: Groups, workout: Workout) => {
    if (!groups[workout.workoutSessionId])
      groups[workout.workoutSessionId] = [];

    groups[workout.workoutSessionId].push(workout);
    return groups;
  }, {} as Groups);
  const sortedWorkouts = Object.values(sorted);
  const workoutSession = sortedWorkouts.map((workout) => {
    const session: Session = {
      date: new Date(),
      ids: [],
      exercises: {},
      sets: {},
      lbs: {},
      reps: {},
    };
    workout.map(
      ({ id, name, sets, lbs, reps, createdAt, workoutSessionId }) => {
        session.sessionId = workoutSessionId;
        session.ids.push(id);
        session.date = createdAt;
        session.exercises[id] = name;
        session.sets[id] = [...sets];
        session.lbs[id] = [...lbs];
        session.reps[id] = [...reps];
      },
    );
    return session;
  });

  return (
    <ul className="workoutlist">
      {workoutSession?.map(
        ({ ids, exercises, sets, lbs, reps, date, sessionId }, index) => (
          <div key={index} className="wrapper">
            <div
              className={
                showWorkouts === sessionId ? "relative w-full" : "hidden"
              }
            >
              {session ? (
                <Detailed
                  session={session}
                  date={date}
                  ids={ids}
                  exercises={exercises}
                  sets={sets}
                  lbs={lbs}
                  reps={reps}
                  sessionId={sessionId}
                  setShowWorkouts={setShowWorkouts}
                  setShowSessions={setShowSessions}
                />
              ) : null}
            </div>
            <div className="container wrapper workoutlist-item rounded-lg">
              <div className="flex justify-between">
                {moment(date).format("dddd, MMM Do")}
                <div
                  onClick={() => {
                    if (sessionId) {
                      setShowOptions(sessionId);
                    }
                  }}
                >
                  <div className="relative w-full">
                    <div
                      className={
                        showOptions === sessionId
                          ? "absolute w-44 bg-white rounded-md p-2 cursor-pointer gap-5 right-0"
                          : "hidden"
                      }
                      onMouseLeave={() => setShowOptions(false)}
                    >
                      <div className="flex flex-col w-full">
                        <Link
                          href={`/edit-workout/${sessionId}`}
                          className="flex flex-row"
                        >
                          <HiPencilAlt className="workoutlist__edit-btn text-blue-700" />
                          <span className="text-lg px-1">Edit Workout</span>
                        </Link>
                        <RemoveBtn
                          ids={ids}
                          sessionId={sessionId}
                          setWorkouts={setWorkouts}
                        />
                      </div>
                    </div>
                  </div>
                  <SlOptions />
                </div>
              </div>
              <div
                onClick={() => {
                  sessionId ? setShowWorkouts(sessionId) : null;
                  setShowSessions(false);
                  sessionId ? selectedSession(sessionId) : null;
                }}
              >
                <Sessions
                  sessions={sessions}
                  ids={ids}
                  exercises={exercises}
                  sets={sets}
                  lbs={lbs}
                  reps={reps}
                />
              </div>
            </div>
          </div>
        ),
      )}
    </ul>
  );
};

export default WorkoutList;
