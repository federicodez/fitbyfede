"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import WorkoutCard from "./WorkoutCard";
import Sessions from "./Sessions";
import Detailed from "./Detailed";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { exampleWorkout } from "@/constants";
import { Workout } from "@/types";
import { HiOutlineTrash } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";

type WorkoutListProps = {
  items: Workout[];
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

const WorkoutList = ({ items }: WorkoutListProps) => {
  const [workouts, setWorkouts] = useState(items);
  const [showSessions, setShowSessions] = useState(true);
  const [showOptions, setShowOptions] = useState<string | boolean>(false);
  const [showWorkouts, setShowWorkouts] = useState<string | boolean>(false);

  const sorted = workouts.reduce((groups: Groups, workout: Workout) => {
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
    <section>
      <Link href="/search-workout" as="/search-workout" className="home-link">
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {workoutSession?.length
          ? workoutSession.map(
              ({ ids, exercises, sets, lbs, reps, date, sessionId }, index) => (
                <div key={index} className="wrapper">
                  <div
                    className={
                      showWorkouts === sessionId ? "relative w-full" : "hidden"
                    }
                  >
                    <Detailed
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
                  </div>
                  <li className="container wrapper workoutlist-item rounded-lg">
                    <div className="flex justify-between">
                      {moment(date).format("dddd, MMM Do")}
                      <button
                        className={showOptions ? "hidden" : ""}
                        onClick={() => {
                          if (sessionId) {
                            setShowOptions(sessionId);
                          }
                        }}
                      >
                        <SlOptions />
                      </button>

                      <div
                        className={
                          showOptions === sessionId
                            ? "workoutlist-btn absolute right-7 flex flex-col bg-white rounded-md p-2"
                            : "hidden"
                        }
                        onMouseLeave={() => setShowOptions(false)}
                      >
                        <Link
                          href={`/edit-workout/${sessionId}`}
                          className="flex flex-row"
                        >
                          <HiPencilAlt className="workoutlist__edit-btn text-blue-700" />
                          <span className="text-lg">Edit Workout</span>
                        </Link>
                        <RemoveBtn
                          ids={ids}
                          sessionId={sessionId}
                          setWorkouts={setWorkouts}
                        />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        sessionId ? setShowWorkouts(sessionId) : null;
                        setShowSessions(false);
                      }}
                    >
                      <Sessions
                        ids={ids}
                        exercises={exercises}
                        sets={sets}
                        lbs={lbs}
                        reps={reps}
                      />
                    </div>
                  </li>
                </div>
              ),
            )
          : exampleWorkout?.map(({ id, name, sets, lbs, reps, createdAt }) => (
              <li key={id} className="container workoutlist-item">
                <div className="workoutlist-btn">
                  <SlOptions />
                </div>
                <div className="workoutlist-date">
                  {moment(createdAt).format("dddd, MMM Do")}
                </div>
                <div className="workoutlist-exercise">
                  <strong>{name}</strong>
                </div>
                <WorkoutCard sets={sets} lbs={lbs} reps={reps} />
              </li>
            ))}
      </ul>
    </section>
  );
};

export default WorkoutList;
