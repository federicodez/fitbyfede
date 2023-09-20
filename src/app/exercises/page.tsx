import SearchBar from "../search-workout/components/SearchBar";
import { getMostRecentWorkouts } from "@/actions";

const Exercises = async () => {
  try {
    const workouts = await getMostRecentWorkouts();
    return workouts ? <SearchBar workouts={workouts} /> : null;
  } catch (err) {
    console.log(err);
  }
};

export default Exercises;
