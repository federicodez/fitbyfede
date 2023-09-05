"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkout } from "@/utils";
import { prisma } from "@/db";
import { useSession } from "next-auth/react";

export default function CreateWorkoutForm() {
  const [exercise, setExercise] = useState("");
  const [lbs, setLbs] = useState(0);
  const [reps, setReps] = useState(0);

  const { data: session } = useSession();
  console.log({ session });

  const router = useRouter();

  const handleSubmit = async () => {
    if (!exercise || !lbs || !reps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }
    const workout = await prisma.workout.create({
      data: { exercise, lbs, reps },
    });
    // await createWorkout();
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="create-form flex flex-col">
        <label htmlFor="exercise">Exercise: </label>
        <input
          onChange={(e) => setExercise(e.target.value)}
          type="text"
          name="exercise"
          id="exercise"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="lbs">Weight (lbs): </label>
        <input
          onChange={(e) => setLbs(e.target.value)}
          type="number"
          name="lbs"
          id="lbs"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="reps">Reps: </label>
        <input
          onChange={(e) => setReps(e.target.value)}
          type="number"
          name="reps"
          id="reps"
          className="bg-white border rounded-lg"
        />
        <button type="submit" className="border rounded-lg bg-blue-900 w-48">
          Create Workout
        </button>
      </form>
    </div>
  );
}
