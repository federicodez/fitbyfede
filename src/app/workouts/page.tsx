import { getSessions, getWorkouts } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";

export const dynamic = "force-dynamic";

const Workouts = async () => {
  try {
    const workouts = await getWorkouts();
    const sessions = await getSessions();

    if (workouts && sessions) {
      return <WorkoutList items={workouts} sessions={sessions} />;
    } else {
      return <EmptyState />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default Workouts;
