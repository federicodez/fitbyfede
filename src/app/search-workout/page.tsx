import dynamic from "next/dynamic";
import { getMostRecentWorkouts, getCreatedExercises } from "@/actions/workouts";
import Navbar from "@/components/navbar/Navbar";
const SearchBar = dynamic(() => import("./components/SearchBar"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

const SearchWorkout = async () => {
  try {
    const recentWorkouts = await getMostRecentWorkouts();
    const createdExercises = await getCreatedExercises();

    return recentWorkouts && createdExercises ? (
      <Navbar>
        <SearchBar
          recentWorkouts={recentWorkouts}
          createdExercises={createdExercises}
        />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log("search error ", err);
  }
};

export default SearchWorkout;
