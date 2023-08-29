"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditWorkoutForm({ id, exercise, lbs, sets, reps }) {
  const [newExercise, setNewExercise] = useState(exercise);
  const [newLbs, setNewLbs] = useState(lbs);
  const [newSets, setNewSets] = useState(sets);
  const [newReps, setNewReps] = useState(reps);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newExercise, newLbs, newSets, newReps }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit workout");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper container">
      <form onSubmit={handleSubmit} className="create-form flex flex-col">
        <label htmlFor="exercise">Exercise: </label>
        <input
          onChange={(e) => setNewExercise(e.target.value)}
          value={newExercise}
          type="text"
          name="exercise"
          id="exercise"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="lbs">Weight (lbs): </label>
        <input
          onChange={(e) => setNewLbs(e.target.value)}
          value={newLbs}
          type="number"
          name="lbs"
          id="lbs"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="sets">Sets: </label>
        <input
          onChange={(e) => setNewSets(e.target.value)}
          value={newSets}
          type="number"
          name="sets"
          id="sets"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="reps">Reps: </label>
        <input
          onChange={(e) => setNewReps(e.target.value)}
          value={newReps}
          type="number"
          name="reps"
          id="reps"
          className="bg-white border rounded-lg"
        />
        <button type="submit" className="border rounded-lg bg-blue-900 w-48">
          Update Workout
        </button>
      </form>
    </div>
  );
}
