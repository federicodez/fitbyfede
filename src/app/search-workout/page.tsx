import dynamic from "next/dynamic";
import { getMostRecentWorkouts, getCreatedExercises } from "@/actions/workouts";
import data from "@/constants/exerciseData.json";
import Navbar from "@/components/navbar/Navbar";
const SearchBar = dynamic(() => import("./components/SearchBar"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

const SearchWorkout = async () => {
  try {
    let workouts;
    const recentWorkouts = await getMostRecentWorkouts();
    const createdExercises = await getCreatedExercises();

    if (createdExercises) {
      workouts = [...data, ...createdExercises];
    }

    return recentWorkouts && workouts ? (
      <Navbar>
        <SearchBar data={workouts} recentWorkouts={recentWorkouts} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log("search error ", err);
  }
};

export default SearchWorkout;
