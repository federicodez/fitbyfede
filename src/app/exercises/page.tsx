import SearchExercises from "./components/SearchExercises";
import Navbar from "@/components/navbar/Navbar";
import { getAllWorkouts } from "@/actions";

const Exercises = async () => {
  try {
    const data = await getAllWorkouts();
    return data ? (
      <Navbar>
        <SearchExercises data={data} />
      </Navbar>
    ) : null;
  } catch (err) {
    console.log(err);
  }
};

export default Exercises;
