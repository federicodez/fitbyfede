import { getWorkouts } from "@/lib/mongo/workouts";
import Link from "next/link";

async function fetchWorkouts() {
  const { workouts } = await getWorkouts();
  if (!workouts) throw new Error("Failed to fetch workouts!");

  return workouts;
}

export default async function Home() {
  const workouts = await fetchWorkouts();
  console.log("workouts", workouts);
  return (
    <main className="wrapper container">
      <h1 className="text-4xl">Start Workout</h1>
      <h2>Quick Start</h2>
      <Link href="/create" className="link">
        Start an Empty Workout
      </Link>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>{workout.exercise}</li>
        ))}
      </ul>
    </main>
  );
}
