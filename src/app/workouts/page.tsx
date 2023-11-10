import { getSessions } from "@/actions";
import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";

// export const dynamic = "force-dynamic";

const Workouts = async () => {
  try {
    const sessions = await getSessions();

    if (sessions) {
      return <WorkoutList sessions={sessions} />;
    } else {
      return <EmptyState />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default Workouts;
