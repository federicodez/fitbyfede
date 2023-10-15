import { getMostRecentWorkouts } from "@/actions";
import SearchBar from "./components/SearchBar";

const SearchWorkout = async () => {
  try {
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return <SearchBar recentWorkouts={recentWorkouts} />;
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
