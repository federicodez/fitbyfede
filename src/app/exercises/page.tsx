import Navbar from "@/components/navbar/Navbar";
import { getMostRecentWorkouts, getCreatedExercises } from "@/actions/workouts";
import data from "@/constants/exerciseData.json";
import dynamic from "next/dynamic";
const SearchExercises = dynamic(() => import("./components/SearchExercises"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

const Exercises = async () => {
  try {
    let workouts;
    const recentWorkouts = await getMostRecentWorkouts();
    const createdExercises = await getCreatedExercises();

    if (createdExercises) {
      workouts = [...data, ...createdExercises];
    }
    return recentWorkouts && workouts ? (
      <Navbar>
        <SearchExercises data={workouts} recentWorkouts={recentWorkouts} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log("search exercise error", err);
  }
};

export default Exercises;
