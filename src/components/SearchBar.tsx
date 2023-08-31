"use client";
import { useState } from "react";
import SearchExercises from "./SearchExercises";

export default function SearchBar() {
  const [exercise, setExercise] = useState("");

  const handleSearch = () => {};

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar-item">
        <SearchExercises exercise={exercise} setExercise={setExercise} />
      </div>
    </form>
  );
}
