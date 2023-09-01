import { SearchBar } from "@/components";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";

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
