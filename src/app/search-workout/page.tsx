import { getMostRecentWorkouts } from "@/actions";
import dynamic from "next/dynamic";
const SearchBar = dynamic(() => import("./components/SearchBar"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
// import SearchBar from "./components/SearchBar";
// import Navbar from "@/components/navbar/Navbar";

const SearchWorkout = async () => {
  try {
    const recentWorkouts = (await getMostRecentWorkouts()) || [];
    return <SearchBar recentWorkouts={recentWorkouts} />;
  } catch (err) {
    console.log(err);
  }
};

export default SearchWorkout;
