import { createWorkout } from "@/lib/mongo/workouts";

export default function Create() {
  return (
    <div className="wrapper container">
      <form action={createWorkout} className="create-form flex flex-col">
        <label htmlFor="exercise">Exercise: </label>
        <input
          type="text"
          name="exercise"
          id="exercise"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="lbs">Weight (lbs): </label>
        <input
          type="number"
          name="lbs"
          id="lbs"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="sets">Sets: </label>
        <input
          type="number"
          name="sets"
          id="sets"
          className="bg-white border rounded-lg"
        />
        <label htmlFor="reps">Reps: </label>
        <input
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
