import { EmptyState } from "@/components";
import WorkoutList from "./components/WorkoutList";
import { getCurrentUser } from "@/actions/users";
import { getSessions } from "@/actions/workouts";

const Workouts = async () => {
  try {
    const currentUser = await getCurrentUser();
    const sessions = await getSessions();

    if (sessions && currentUser) {
      return (
        <WorkoutList currentUser={currentUser} initialSessions={sessions} />
      );
    } else {
      return <EmptyState />;
    }
  } catch (err) {
    console.log("workouts error ", err);
  }
};

export default Workouts;
