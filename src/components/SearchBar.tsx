"use client";
import { useState } from "react";
import { SearchExercises } from "./";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [exercise, setExercise] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exercise.length) {
      router.push(`/createWorkout/${exercise}`);
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <button type="submit">add</button>
      <div className="searchbar-item">
        <SearchExercises exercise={exercise} setExercise={setExercise} />
      </div>
    </form>
  );
}
