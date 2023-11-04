import { getSessions, getWorkouts } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Workouts = async () => {
  try {
    const workouts = await getWorkouts();
    const sessions = await getSessions();

    if (workouts && sessions) {
      return (
        <section>
          <Link
            href="/search-workout"
            as="/search-workout"
            className="home-link"
          >
            Start a Workout
          </Link>
          <WorkoutList items={workouts} sessions={sessions} />
        </section>
      );
    } else {
      return <EmptyState />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default Workouts;
