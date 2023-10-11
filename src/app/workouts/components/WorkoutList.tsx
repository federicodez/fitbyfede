"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import WorkoutCard from "./WorkoutCard";
import Sessions from "./Sessions";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { exampleWorkout } from "@/constants";
import { WorkoutSession } from "@prisma/client";
import { Workout } from "@/types";

type WorkoutListProps = {
  items: Workout[];
};

type SortedWorkouts = {
  sessionId: {
    workouts: Workout[];
  }[];
};

type Groups = {
  [key: string]: Workout[];
};

type Session = {
  sessionId?: string;
  date?: Date;
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
  const sorted = items.reduce((groups: Groups, workout: Workout) => {
    if (!groups[workout.workoutSessionId])
      groups[workout.workoutSessionId] = [];

    groups[workout.workoutSessionId].push(workout);
    return groups;
  }, {} as Groups);
  const sortedWorkouts = Object.entries(sorted);
  const workoutSession = sortedWorkouts.map((workout) => {
    const session: Session = {
      ids: [],
      exercises: {},
      sets: {},
      lbs: {},
      reps: {},
    };
    workout[1].map(
      ({ id, exercise, sets, lbs, reps, createdAt, workoutSessionId }) => {
        session.sessionId = workoutSessionId;
        session.ids.push(id);
        session.date = createdAt;
        session.exercises[id] = exercise;
        session.sets[id] = [...sets];
        session.lbs[id] = [...lbs];
        session.reps[id] = [...reps];
      },
    );
    return session;
  });
  console.log("session: ", workoutSession);

  return (
    <section>
      <Link href="/search-workout" className="home-link">
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {workoutSession?.length
          ? workoutSession.map(
              ({ ids, exercises, sets, lbs, reps, date, sessionId }, index) => (
                <li key={index} className="container workoutlist-item">
                  <div className="workoutlist-btn">
                    <RemoveBtn
                      ids={ids}
                      sessionId={sessionId}
                      setWorkouts={setWorkouts}
                    />
                    <Link href={`/edit-workout/${sessionId}`}>
                      <HiPencilAlt className="workoutlist__edit-btn" />
                    </Link>
                  </div>
                  <div className="workoutlist-date">
                    {moment(date).format("dddd, MMM Do")}
                  </div>
                  <Sessions
                    ids={ids}
                    exercises={exercises}
                    sets={sets}
                    lbs={lbs}
                    reps={reps}
                    sessionId={sessionId}
                  />
                </li>
              ),
            )
          : exampleWorkout?.map(
              ({
                id,
                exercise,
                sets,
                lbs,
                reps,
                createdAt,
                workoutSessionId,
              }) => (
                <li key={id} className="container workoutlist-item">
                  <div className="workoutlist-btn">
                    <RemoveBtn
                      setWorkouts={setWorkouts}
                      id={id}
                      workoutSessionId={workoutSessionId}
                    />
                    <Link href={`/edit-workout/${id}`}>
                      <HiPencilAlt />
                    </Link>
                  </div>
                  <div className="workoutlist-date">
                    {moment(createdAt).format("dddd, MMM Do")}
                  </div>
                  <div className="workoutlist-exercise">
                    <strong>{exercise}</strong>
                  </div>
                  <WorkoutCard sets={sets} lbs={lbs} reps={reps} />
                </li>
              ),
            )}
      </ul>
    </section>
  );
};

export default WorkoutList;
