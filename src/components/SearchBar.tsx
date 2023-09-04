"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { exercises } from "@/constants";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleClick = async (exercise: [string, string]) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/update-workout/${exercise[0]}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ exercise }),
        },
      );

      if (res.ok) {
        router.push(`/finishWorkout`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredExercises =
    query === ""
      ? exercises
      : exercises.filter((item) =>
          item[0]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="searchbar wrapper container">
      <button type="button" className="searchbar-btn" id="create-btn">
        <Link href="/createWorkout">New</Link>
      </button>
      <button type="button" className="searchbar-btn" id="cancel-btn">
        <Link href="/">
          <HiX />
        </Link>
      </button>
      <form className="searchbar-form">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="query"
          placeholder="Search"
          className="searchbar-form__input"
        />
        <button type="submit" className="searchbar-btn" id="__add-btn">
          Add
        </button>
      </form>
      <ul className="filtered__list">
        {filteredExercises?.map((exercise, id) => (
          <li key={id} className="filtered__item">
            <div onClick={() => handleClick(exercise)}>
              <strong>{exercise[0]}</strong>
            </div>
            <div>{exercise[1]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
