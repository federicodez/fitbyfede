import dynamic from "next/dynamic";
const SearchExercises = dynamic(() => import("./components/SearchExercises"), {
  ssr: false,
});
// import SearchExercises from "./components/SearchExercises";
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
    console.log("search exercise error", err);
  }
};

export default Exercises;
