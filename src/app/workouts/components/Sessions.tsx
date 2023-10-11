"use client";

import { useState } from "react";
import { RemoveBtn } from "@/components";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";

type SessionsProps = {
  ids: any[];
  exercises: {
    id: string;
  };
  sets: {
    id: string[];
  };
  lbs: {
    id: number[];
  };
  reps: {
    id: number[];
  };
  sessionId: string;
};

const Sessions = ({
  ids,
  exercises,
  sets,
  lbs,
  reps,
  sessionId,
}: SessionsProps) =>
  ids?.map((id: string, idIndex: number) => (
    <div key={idIndex} className="workout-card wrapper">
      <ul className="workout-card-list">
        <li className="workout-card-item">
          <div className="workoutlist-exercise">
            <strong>{exercises[id]}</strong>
          </div>
          <ul className="workout-card-list">
            {sets[id]?.map((set: number, setIndex: number) => (
              <li key={setIndex} className="workout-card-item">
                <div className="workout-card__set-label">Set</div>
                <div className="workout-card__set-id">{set}</div>
              </li>
            ))}
          </ul>
          <ul className="workout-card-list">
            {lbs[id]?.map((lb: number, lbIndex: number) => (
              <li key={lbIndex} className="workout-card-item">
                <div className="workout-card__lb">{lb}</div>
                <div className="workout-card__lbs-label">lbs</div>
              </li>
            ))}
          </ul>
          <ul className="workout-card-list">
            {reps[id]?.map((rep: number, repIndex: number) => (
              <li key={repIndex} className="workout-card-item">
                <div className="workout-card__X">x</div>
                <div className="workout-card__reps">{rep}</div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  ));

export default Sessions;
