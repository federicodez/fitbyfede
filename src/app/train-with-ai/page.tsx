import Ai from "./components/Ai";
import { getCurrentUser } from "@/actions/users";
import { getSessions } from "@/actions/workouts";

export default async function TrainWithAi() {
  try {
    const currentUser = await getCurrentUser();
    const sessions = await getSessions();

    if (sessions && currentUser) {
      return <Ai currentUser={currentUser} sessions={sessions} />;
    }
  } catch (err) {
    console.log(err);
  }
}
