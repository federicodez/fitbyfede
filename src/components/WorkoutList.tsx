"use client";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getWorkouts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/workouts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading workouts: ", error);
  }
};

export default async function Workouts() {
  const { workouts } = await getWorkouts();
  return (
    <>
      <ul className="workouts">
        {workouts.map(({ exercise, lbs, sets, reps, _id }) => (
          <li key={_id} className="container card">
            <div className="exercise">
              <strong>{exercise}</strong>
            </div>
            <div className="lbs">
              {lbs}
              <i>lbs</i>
            </div>
            <div className="sets">Sets: {sets}</div>
            <div className="reps">Reps: {reps}</div>
            <button type="button" className="update-btn">
              Update Workout
            </button>
            <RemoveBtn id={_id} />
            <Link href={`/editWorkout/${_id}`}>
              <HiPencilAlt />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
