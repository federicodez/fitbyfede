"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [exercise, setExercise] = useState("");
  const [lbs, setLbs] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exercise || !lbs || !sets || !reps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/workouts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ exercise, lbs, sets, reps }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper container">
      <form onSubmit={handleSubmit} className="create-form flex flex-col">
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
        <label htmlFor="sets">Sets: </label>
        <input
          onChange={(e) => setSets(e.target.value)}
          type="number"
          name="sets"
          id="sets"
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
