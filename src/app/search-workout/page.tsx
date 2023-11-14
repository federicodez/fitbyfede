import { createWorkoutSession, getMostRecentWorkouts } from "@/actions";
import Navbar from "@/components/navbar/Navbar";
import SearchBar from "./components/SearchBar";

const SearchWorkout = async () => {
  try {
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return (
      <Navbar>
        <SearchBar recentWorkouts={recentWorkouts} />
      </Navbar>
    );
  } catch (err) {
    console.log("search error ", err);
  }
};

export default SearchWorkout;
