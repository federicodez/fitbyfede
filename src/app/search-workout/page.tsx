import { getMostRecentWorkouts } from "@/actions";
import SearchBar from "./components/SearchBar";

const SearchWorkout = async () => {
  try {
    const workouts = await getMostRecentWorkouts();

    if (workouts) {
      return <SearchBar workouts={workouts} />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
