import WorkoutList from "@/components/WorkoutList";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="wrapper container">
      <h1 className="home-title">Start Workout</h1>
      <Link href="/searchWorkout" className="home-link">
        Start an Empty Workout
      </Link>
      <WorkoutList />
    </main>
  );
}
