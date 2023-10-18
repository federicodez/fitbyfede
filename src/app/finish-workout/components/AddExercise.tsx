"use client";

import { useState } from "react";
import { HiX } from "react-icons/hi";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import Link from "next/link";
import { createWorkoutSession, createMany } from "@/actions";
import { useRouter } from "next/navigation";
import { Workout, Data } from "@/types";
import LoadingModel from "@/components/models/LoadingModel";
import Image from "next/image";
import { bodyParts, categories } from "@/constants";
import data from "@/constants/exerciseData.json";

type AddExerciseProps = {
  sessionId: string;
  recentWorkouts: Workout[];
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddExercise = ({
  sessionId,
  recentWorkouts,
  setAddExercise,
}: AddExerciseProps) => {
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<string | boolean>(false);
  const [showParts, setShowParts] = useState(false);
  const [bodyPartBtn, setBodyPartBtn] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [categoriesBtn, setCategoriesBtn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState(data);
  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);
  const [recent, setRecent] = useState(recentWorkouts);

  const router = useRouter();

  const handleParts = async (query: string) => {
    try {
      const recentParts = recent.filter(({ bodyPart }) => bodyPart === query);
      const parts = workouts.filter(({ bodyPart }) => bodyPart === query);
      setBodyPartBtn(query);
      setWorkouts(parts);
      setRecent(recentParts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategories = async (query: string) => {
    try {
      const categories = workouts.filter(
        ({ equipment }) => equipment === query,
      );
      setCategoriesBtn(query);
      setWorkouts(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      const exercises: Data = [];
      workouts.filter((workout) => {
        exerciseQueue.map((exercise) => {
          if (exercise === workout.name) {
            exercises.push(workout);
          }
        });
      });
      await createMany(exercises, sessionId);
      router.refresh();
      setAddExercise(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addToExercises = async (name: string) => {
    if (!exerciseQueue.includes(name)) {
      exerciseQueue.push(name);
    } else {
      const index = exerciseQueue.indexOf(name);
      exerciseQueue.splice(index, 1);
    }
    setExerciseQueue([...exerciseQueue]);
  };

  const filteredExercises =
    query === ""
      ? workouts
      : workouts?.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        <div
          className={!details ? `flex flex-row justify-between mt-8` : "hidden"}
        >
          <button type="button" className="text-[#03045e]" id="create-btn">
            <Link href="/create-workout">New</Link>
          </button>
          <button
            type="button"
            className="text-[#c1121f]"
            id="cancel-btn"
            onClick={() => setAddExercise(false)}
          >
            <HiX />
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
        <form className={!details ? "searchbar-form" : "hidden"}>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="query"
            placeholder="Search"
            className="searchbar-form__input"
          />
        </form>
        <div
          className={
            !details ? `flex justify-evenly items-center my-2` : "hidden"
          }
        >
          <div>
            <button
              onClick={() => {
                setShowParts(!showParts);
              }}
              className="w-fit h-fit rounded-lg bg-gray-50 px-5"
            >
              {bodyPartBtn ? bodyPartBtn : "Any Body Part"}
            </button>
            <ul className="absolute bg-gray-800 text-white rounded-lg m-5">
              {showParts
                ? bodyParts.map((part, idx) => (
                    <li key={idx}>
                      <option
                        onClick={() => {
                          handleParts(part);
                          setShowParts(false);
                        }}
                        className="flex flex-col"
                        value={part}
                      >
                        {part}
                      </option>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div>
            <button
              onClick={() => {
                setShowCategories(!showCategories);
              }}
              className="w-fit h-fit rounded-lg bg-gray-50 px-5"
            >
              {categoriesBtn ? categoriesBtn : "Any Category"}
            </button>
            <ul className="absolute bg-gray-800 text-white rounded-lg m-5">
              {showCategories
                ? categories.map((category, idx) => (
                    <li key={idx}>
                      <option
                        onClick={() => {
                          handleCategories(category);
                          setShowCategories(false);
                        }}
                        className="flex flex-col"
                        value={category}
                      >
                        {category}
                      </option>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <ul className="filtered__list">
          {recent?.length ? (
            <h3 className="most-recent-title">RECENT</h3>
          ) : null}
          {recent?.map(({ bodyPart, gifId, id, name }) => (
            <div key={id}>
              <div
                className={
                  !details
                    ? `grid grid-cols-6 gap-5 m-5 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                    : "hidden"
                }
                onClick={() => {
                  addToExercises(name);
                }}
              >
                <Image
                  className="col-span-1"
                  id="gif"
                  src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
                  alt="workout gif"
                  height={100}
                  width={100}
                  priority={true}
                />
                <div className="grid grid-rows-2 col-span-4 items-center">
                  <strong id="name" className="row-span-1">
                    {name}
                  </strong>
                  <div className="row-span-1" id="bodypart">
                    {bodyPart}
                  </div>
                </div>
                <div
                  onClick={() => setDetails(id)}
                  className="col-span-1 flex justify-center items-center"
                >
                  {exerciseQueue.includes(name) ? (
                    <AiOutlineCheck />
                  ) : (
                    <AiOutlineQuestion />
                  )}
                </div>
              </div>
            </div>
          ))}
          <h3 className="filtered-title">EXERCISES</h3>
          {filteredExercises?.map(
            ({ bodyPart, id, name, secondaryMuscles, instructions }) => (
              <div key={id}>
                <div
                  className={
                    !details
                      ? `grid grid-cols-6 gap-5 m-5 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                      : "hidden"
                  }
                  onClick={() => {
                    addToExercises(name);
                  }}
                >
                  <Image
                    className="col-span-1"
                    id="gif"
                    src={`https://fitbyfede-db.s3.amazonaws.com/1080/${id}.gif`}
                    height={100}
                    width={100}
                    alt="exercise gif"
                    priority={true}
                  />
                  <div className="grid grid-rows-2 col-span-4 items-center">
                    <strong id="name" className="row-span-1">
                      {name}
                    </strong>
                    <div className="row-span-1" id="bodypart">
                      {bodyPart}
                    </div>
                  </div>
                  <div
                    onClick={() => setDetails(id)}
                    className="col-span-1 flex justify-center items-center"
                  >
                    {exerciseQueue.includes(name) ? (
                      <AiOutlineCheck />
                    ) : (
                      <AiOutlineQuestion />
                    )}
                  </div>
                </div>
                <div
                  className={
                    details === id
                      ? `flex flex-col p-5 my-10 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                      : "hidden"
                  }
                >
                  <button
                    className="flex justify-center items-center w-10 h-5 rounded-lg bg-gray-50"
                    onClick={() => setDetails(false)}
                  >
                    <HiX />
                  </button>
                  <h3 className="text-center m-2 font-bold" id="name">
                    {name}
                  </h3>
                  <Image
                    className="flex self-center rounded-md"
                    id="gif"
                    src={`https://fitbyfede-db.s3.amazonaws.com/1080/${id}.gif`}
                    height={400}
                    width={400}
                    alt="exercise gif"
                  />
                  <h3 className="text-center m-2 underline font-semibold">
                    Instructions
                  </h3>
                  <ol className="px-10">
                    {instructions.map((item, itemId) => (
                      <li
                        key={itemId}
                        id="intructions"
                        className="list-decimal"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                  <h3 className="underline m-2 font-semibold">
                    Secondary Mucles
                  </h3>
                  <ol className="px-10" type="1">
                    {secondaryMuscles.map((muscle, muscleId) => (
                      <li
                        className="list-decimal"
                        key={muscleId}
                        id="secondary-muscle"
                      >
                        {muscle}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ),
          )}
        </ul>
      </div>
    </>
  );
};

export default AddExercise;
