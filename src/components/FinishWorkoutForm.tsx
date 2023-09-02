"use client";
import { useRouter } from "next/navigation";

interface FinishWorkoutFormProps {
  exercise: string;
}

export default function FinishWorkoutForm({
  exercise,
}: FinishWorkoutFormProps) {
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const lbs = data.getAll("lbs")?.valueOf();
    const reps = data.getAll("reps")?.valueOf();

    if (!lbs || !reps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/workouts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ exercise, lbs, reps }),
      });

      if (res.ok) {
        router.refresh();
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
      <form action={handleSubmit} className="create-form flex flex-col">
        <h1>{exercise}</h1>
        <label htmlFor="lbs">Weight (lbs): </label>
        <input
          type="number"
          name="lbs"
          id="lbs"
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
