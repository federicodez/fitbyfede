import { getMostRecentWorkouts, getExerciseData } from "@/actions";
import SearchBar from "./components/SearchBar";

const SearchWorkout = async () => {
  try {
    const data = await getExerciseData();
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return <SearchBar recentWorkouts={recentWorkouts} data={data} />;
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
