import Navbar from "@/components/navbar/Navbar";
import { getMostRecentWorkouts } from "@/actions/workouts";
import dynamic from "next/dynamic";
const SearchExercises = dynamic(() => import("./components/SearchExercises"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

const Exercises = async () => {
  try {
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return recentWorkouts ? (
      <Navbar>
        <SearchExercises recentWorkouts={recentWorkouts} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log("search exercise error", err);
  }
};

export default Exercises;
