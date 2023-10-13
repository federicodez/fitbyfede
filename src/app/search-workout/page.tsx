import { getMostRecentWorkouts, getAllWorkouts } from "@/actions";
import SearchBar from "./components/SearchBar";

const SearchWorkout = async () => {
  try {
    const workouts = (await getMostRecentWorkouts()) || [];
    return <SearchBar workouts={workouts} />;
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
