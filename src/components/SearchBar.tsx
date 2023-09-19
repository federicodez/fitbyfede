"use client";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { exercises } from "@/constants";
import { createWorkout } from "@/actions";
import { useRouter } from "next/navigation";
import { CurrentUser } from "@/types";

type SearchBarProps = {
  currentUser: CurrentUser;
};

const SearchBar = ({ currentUser }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleClick = async (exercise: string) => {
    // console.log("searchbar: ", exercise);
    try {
      // await createWorkout(currentUser.id, exercise);
      router.push(`/finish-workout/${exercise}`);
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
            <div onClick={() => handleClick(exercise[0])}>
              <strong>{exercise[0]}</strong>
            </div>
            <div>{exercise[1]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
