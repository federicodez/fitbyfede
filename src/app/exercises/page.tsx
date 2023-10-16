import SearchExercises from "./components/SearchExercises";
import Navbar from "@/components/navbar/Navbar";
import { getMostRecentWorkouts, getExerciseData } from "@/actions";

const Exercises = async () => {
  try {
    const data = await getExerciseData();
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return recentWorkouts ? (
      <Navbar>
        <SearchExercises recentWorkouts={recentWorkouts} data={data} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log(err);
  }
};

export default Exercises;
