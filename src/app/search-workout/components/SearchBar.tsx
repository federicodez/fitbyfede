"use client";

import { useState } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { exercises } from "@/constants";
import { createExercise } from "@/actions";
import { useRouter } from "next/navigation";
import { Workout } from "@/types";
import LoadingModel from "@/components/models/LoadingModel";

type SearchBarProps = {
  workouts: Workout[];
};

const SearchBar = ({ workouts }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = async (exercise: string) => {
    try {
      const workout = await createExercise(exercise);
      if (workout) {
        setIsLoading(true);
        router.push(`/finish-workout/${workout.id}`);
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
    <>
      {isLoading && <LoadingModel />}
      <div className="searchbar wrapper container">
        <button type="button" className="searchbar-btn" id="create-btn">
          <Link href="/create-workout">New</Link>
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
          <h3 className="most-recent-title">RECENT</h3>
          {workouts?.map((workout, id) => (
            <li key={id} className="filtered__item">
              <div onClick={() => handleClick(workout.exercise)}>
                <input
                  type="checkbox"
                  id="exercise"
                  name="exercise"
                  className="filtered__item-checkbox"
                />
                <strong>{workout.exercise}</strong>
              </div>
            </li>
          ))}
          <h3 className="filtered-title">EXERCISES</h3>
          {filteredExercises?.map((exercise, id) => (
            <li key={id} className="filtered__item">
              <div onClick={() => handleClick(exercise[0])}>
                <input
                  type="checkbox"
                  id="exercise"
                  name="exercise"
                  className="filtered__item-checkbox"
                />
                <strong>{exercise[0]}</strong>
              </div>
              <div>{exercise[1]}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
