import { getMostRecentWorkouts, getAllWorkouts } from "@/actions";
import SearchBar from "./components/SearchBar";

const SearchWorkout = async () => {
  try {
    const workouts = (await getMostRecentWorkouts()) || [];
    const { data } = await getAllWorkouts();
    return <SearchBar workouts={workouts} data={data} />;
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
