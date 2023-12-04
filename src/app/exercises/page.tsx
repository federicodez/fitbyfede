import Navbar from "@/components/navbar/Navbar";
import { getMostRecentWorkouts, getCreatedExercises } from "@/actions/workouts";
import data from "@/constants/exerciseData.json";
import dynamic from "next/dynamic";
import LoadingModal from "@/components/modals/LoadingModal";
const SearchExercises = dynamic(() => import("./components/SearchExercises"), {
  loading: () => <LoadingModal />,
});

const Exercises = async () => {
  try {
    let workouts;
    const recentWorkouts = await getMostRecentWorkouts();
    const createdExercises = await getCreatedExercises();

    if (createdExercises) {
      workouts = [...data, ...createdExercises];
    }
    return recentWorkouts && workouts ? (
      <Navbar>
        <SearchExercises data={workouts} recentWorkouts={recentWorkouts} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log("search exercise error", err);
  }
};

export default Exercises;
