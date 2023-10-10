"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";

type SessionsProps = {
  ids: string[];
  exercises: string[];
  sets: string[];
  lbs: number[];
  reps: number[];
  workoutSessionId: string;
};

const Sessions = ({
  ids,
  exercises,
  sets,
  lbs,
  reps,
  workoutSessionId,
}: SessionsProps) => {
  return (
    <>
      <ul className="workout-card-list">
        {exercises?.map((exercise: string, id: number) => (
          <li key={id} className="workout-card-item">
            <div className="workoutlist-exercise">
              <strong className="workout-card__set-id">{exercise}</strong>
            </div>
            <WorkoutCard sets={sets} lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sessions;
