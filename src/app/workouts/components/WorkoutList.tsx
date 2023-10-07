"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import WorkoutCard from "./WorkoutCard";
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

const WorkoutList = ({ items }: WorkoutListProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>(items);
  // const sorted = items.reduce((groups: Groups, workout: Workout) => {
  //   if (!groups[workout.workoutSessionId])
  //     groups[workout.workoutSessionId] = [];
  //
  //   groups[workout.workoutSessionId].push(workout);
  //   return groups;
  // }, {} as Groups);
  // const sortedWorkouts = Object.values(sorted);
  // sortedWorkouts.map((items) => console.log(items));

  return (
    <section>
      <Link href="/search-workout" className="home-link">
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {workouts?.length
          ? workouts.map(({ id, exercise, sets, lbs, reps, createdAt }) => (
              <li key={id} className="container workoutlist-item">
                <WorkoutCard
                  id={id}
                  exercise={exercise}
                  sets={sets}
                  lbs={lbs}
                  reps={reps}
                  createdAt={createdAt}
                  setWorkouts={setWorkouts}
                />
              </li>
            ))
          : exampleWorkout?.map(
              ({ id, exercise, sets, lbs, reps, createdAt }) => (
                <li key={id} className="container workoutlist-item">
                  <WorkoutCard
                    id={id}
                    exercise={exercise[0]}
                    sets={sets}
                    lbs={lbs}
                    reps={reps}
                    createdAt={createdAt}
                    setWorkouts={setWorkouts}
                  />
                </li>
              ),
            )}
      </ul>
    </section>
  );
};

export default WorkoutList;
