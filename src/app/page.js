import WorkoutList from "@/components/WorkoutList";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="wrapper container">
      <h1 className="title">Start Workout</h1>
      <h2 className="sub-title">Quick Start</h2>
      <Link href="/searchWorkout" className="link">
        Start an Empty Workout
      </Link>
      <WorkoutList />
    </main>
  );
}
