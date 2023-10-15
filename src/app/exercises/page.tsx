import SearchExercises from "./components/SearchExercises";
import Navbar from "@/components/navbar/Navbar";
import { getMostRecentWorkouts } from "@/actions";

const Exercises = async () => {
  try {
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return recentWorkouts ? (
      <Navbar>
        <SearchExercises recentWorkouts={recentWorkouts} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log(err);
  }
};

export default Exercises;
