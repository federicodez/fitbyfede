import dynamic from "next/dynamic";
import { getMostRecentWorkouts, getCreatedExercises } from "@/actions/workouts";
import Navbar from "@/components/navbar/Navbar";
const SearchBar = dynamic(() => import("./components/SearchBar"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

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
