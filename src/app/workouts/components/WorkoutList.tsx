"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import WorkoutCard from "./WorkoutCard";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { Workout, CurrentUser } from "@/types";
import { exampleWorkout } from "@/constants";

type WorkoutListProps = {
  items: Workout[];
  currentUser: CurrentUser;
};

const WorkoutList = ({ currentUser, items }: WorkoutListProps) => {
  const [workouts, setWorkouts] = useState(items);

  return workouts?.length ? (
    <section>
      <h1 className="home-title">Start Workout</h1>
      <Link href="/search-workout" className="home-link">
        Start an Empty Workout
      </Link>
      <ul className="workoutlist">
        {workouts?.map(({ id, exercise, lbs, reps, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="workoutlist-btn">
              <RemoveBtn
                id={id}
                setWorkouts={setWorkouts}
                currentUser={currentUser}
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
            <WorkoutCard lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <section>
      <h1 className="home-title">Start Workout</h1>
      <Link href="/search-workout" className="home-link">
        Start an Empty Workout
      </Link>
      <ul className="workoutlist">
        {exampleWorkout?.map(({ id, exercise, lbs, reps, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="workoutlist-btn">
              <RemoveBtn id={id} />
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
            <WorkoutCard lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorkoutList;
