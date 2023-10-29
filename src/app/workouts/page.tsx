import { getSessions, getWorkouts } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";
import { Workout } from "@/types";
import Link from "next/link";

type Groups = {
  [key: string]: Workout[];
};

type Session = {
  sessionId?: string;
  date: Date;
  ids: any[];
  exercises: {
    [key: string]: string;
  };
  sets: {
    [key: string]: string[];
  };
  lbs: {
    [key: string]: number[];
  };
  reps: {
    [key: string]: number[];
  };
};

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
