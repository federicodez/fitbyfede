"use client";

import { useState, MouseEvent } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { exercises } from "@/constants";
import { createExercise, createWorkoutSession, createMany } from "@/actions";
import { useRouter } from "next/navigation";
import { Workout } from "@/types";
import LoadingModel from "@/components/models/LoadingModel";

type SearchBarProps = {
  workouts: Workout[];
};

const SearchBar = ({ workouts }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);

  const router = useRouter();

  const handleClick = async () => {
    try {
      const session = await createWorkoutSession();

      if (session) {
        await createMany(exerciseQueue, session);
        setIsLoading(true);
        router.push(`/finish-workout/${session.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToExercises = async (exercise: string) => {
    if (!exerciseQueue.includes(exercise)) {
      exerciseQueue.push(exercise);
    } else {
      const index = exerciseQueue.indexOf(exercise);
      exerciseQueue.splice(index, 1);
    }
    setExerciseQueue([...exerciseQueue]);
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
        <div className="flex flex-row justify-between">
          <button type="button" className="text-[#03045e]" id="create-btn">
            <Link href="/create-workout">New</Link>
          </button>
          <button type="button" className="text-[#c1121f]" id="cancel-btn">
            <Link href="/workouts">
              <HiX />
            </Link>
          </button>
          <button
            type="button"
            onClick={handleClick}
            className="text-[#03045e]"
            id="__add-btn"
          >
            {`Add (${exerciseQueue?.length})`}
          </button>
        </div>
        <form className="searchbar-form">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="query"
            placeholder="Search"
            className="searchbar-form__input"
          />
        </form>
        <ul className="filtered__list">
          {workouts?.length ? (
            <h3 className="most-recent-title">RECENT</h3>
          ) : null}
          {workouts?.map((workout, id) => (
            <li key={id} className="filtered__item">
              <div>
                <input
                  type="checkbox"
                  id="exercise"
                  name="exercise"
                  value={workout.exercise}
                  onChange={() => addToExercises(workout.exercise)}
                  className="filtered__item-checkbox"
                />
                <strong>{workout.exercise}</strong>
              </div>
            </li>
          ))}
          <h3 className="filtered-title">EXERCISES</h3>
          {filteredExercises?.map((exercise, id) => (
            <li key={id} className="filtered__item">
              <div>
                <input
                  type="checkbox"
                  id="exercise"
                  name="exercise"
                  value={exercise[0]}
                  onChange={() => addToExercises(exercise[0])}
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
