import { SearchBar } from "@/components";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";

// const getWorkouts = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/workouts", {
//       cache: "no-store",
//     });
//
//     if (!res.ok) {
//       throw new Error("Failed to fetch workouts");
//     }
//
//     return res.json();
//   } catch (error) {
//     console.log("Error loading workouts: ", error);
//   }
// };

export default function SearchWorkout() {
  return (
    <div>
      <Link href="/createWorkout">
        <HiPlus />
        New
      </Link>
      <SearchBar />
    </div>
  );
}
