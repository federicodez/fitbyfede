import { createWorkoutSession, getMostRecentWorkouts } from "@/actions";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar/Navbar";
import SearchBar from "./components/SearchBar";
// const SearchBar = dynamic(() => import("./components/SearchBar"), {
//   ssr: false,
// });

const SearchWorkout = async () => {
  try {
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    const session = await createWorkoutSession();
    return (
      <Navbar>
        {session && (
          <SearchBar session={session} recentWorkouts={recentWorkouts} />
        )}
      </Navbar>
    );
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
