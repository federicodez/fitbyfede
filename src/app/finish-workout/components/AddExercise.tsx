"use client";

import { Suspense, useState } from "react";
import { HiX } from "react-icons/hi";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import Link from "next/link";
import { createMany, getSessionById, getWorkoutsBySessionId } from "@/actions";
import { useRouter } from "next/navigation";
import { Workout, Data, WorkoutSession } from "@/types";
import LoadingModel from "@/components/models/LoadingModel";
import Image from "next/image";
import { bodyParts, categories } from "@/constants";
import data from "@/constants/exerciseData.json";
import { Pagination, paginate } from "@/components/Pagination";

type AddExerciseProps = {
  session: WorkoutSession;
  recentWorkouts: Workout[];
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<WorkoutSession>>;
};

const AddExercise = ({
  session,
  recentWorkouts,
  setAddExercise,
  setSession,
}: AddExerciseProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<string | boolean>(false);

  const [showParts, setShowParts] = useState(false);
  const [partsActivated, setPartsActivated] = useState(false);
  const [bodyPartBtn, setBodyPartBtn] = useState("Any Body Part");
  const [showCategories, setShowCategories] = useState(false);
  const [categoryActivated, setCategoryActivated] = useState(false);
  const [categoriesBtn, setCategoriesBtn] = useState("Any Category");

  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);
  const [recent, setRecent] = useState(recentWorkouts);

  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(50);
  const [workoutData, setWorkoutData] = useState(data);

  const paginatedWorkouts = paginate(workoutData, currentPage, workoutsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleParts = async (query: string) => {
    let filtered;
    try {
      if (query === "any" && categoriesBtn === "Any Category") {
        setPartsActivated(false);
        setBodyPartBtn("Any Body Part");
        setWorkoutData(data);
      } else if (query === "any" && categoriesBtn !== "Any Category") {
        setBodyPartBtn("Any Body Part");
        const categories = data.filter(
          ({ equipment }) => equipment === categoriesBtn,
        );
        setWorkoutData(categories);
        setPartsActivated(false);
      } else if (categoriesBtn !== "Any Category") {
        const filtered: Data = [];
        data.filter((item) => {
          if (item.bodyPart === query && item.equipment === categoriesBtn) {
            filtered.push(item);
          }
        });
        setWorkoutData(filtered);
        setBodyPartBtn(query);
        const recentParts = recentWorkouts.filter(
          ({ bodyPart }) => bodyPart === query,
        );
        setRecent(recentParts);
      } else {
        filtered = data.filter(({ bodyPart }) => bodyPart === query);
        setWorkoutData(filtered);
        setBodyPartBtn(query);
        const recentParts = recentWorkouts.filter(
          ({ bodyPart }) => bodyPart === query,
        );
        setRecent(recentParts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategories = async (query: string) => {
    let categories;
    try {
      if (query === "any" && bodyPartBtn === "Any Body Part") {
        setCategoriesBtn("Any Category");
        setWorkoutData(data);
        setCategoryActivated(false);
      } else if (query === "any" && bodyPartBtn !== "Any Body Part") {
        setCategoriesBtn("Any Category");
        const filtered = data.filter(
          ({ bodyPart }) => bodyPart === bodyPartBtn,
        );
        setWorkoutData(filtered);
        setCategoryActivated(false);
      } else if (bodyPartBtn !== "Any Body Part") {
        const filtered: Data = [];
        data.filter((item) => {
          if (item.equipment === query && item.bodyPart === bodyPartBtn) {
            filtered.push(item);
          }
        });
        setWorkoutData(filtered);
        setCategoriesBtn(query);
      } else {
        categories = data.filter(({ equipment }) => equipment === query);
        setWorkoutData(categories);
        setCategoriesBtn(query);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      await createMany(exerciseQueue, session.id);
      const newSession = await getSessionById(session.id);
      if (newSession) {
        setSession(newSession);
      }
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
      ? paginatedWorkouts
      : paginatedWorkouts?.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Suspense fallback={<LoadingModel />}>
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
            className="w-full bg-white rounded-lg"
          />
        </form>
        <div
          className={
            !details
              ? `grid grid-cols-2 justify-center items-center gap-3 my-2`
              : "hidden"
          }
        >
          <div className="relative w-full">
            <ul
              onMouseLeave={() => setShowParts(!showParts)}
              className="absolute w-full z-10 bg-gray-800 text-white rounded-lg left-0"
            >
              {showParts
                ? bodyParts.map((part, idx) => (
                    <li
                      key={idx}
                      className={`flex flex-row cursor-pointer p-2 ${
                        bodyPartBtn === part ? "bg-gray-500" : ""
                      }`}
                    >
                      <option
                        onClick={() => {
                          handleParts(part);
                          setShowParts(false);
                        }}
                        className={`flex flex-col w-full`}
                        value={part}
                      >
                        {part}
                      </option>
                      {bodyPartBtn === part ? <AiOutlineCheck /> : null}
                    </li>
                  ))
                : null}
            </ul>
            <button
              onClick={() => {
                setShowParts(!showParts);
              }}
              className={`w-full rounded-lg px-5 ${
                bodyPartBtn !== "Any Body Part" ? "bg-blue-300" : "bg-gray-50"
              }`}
            >
              {bodyPartBtn}
            </button>
          </div>
          <div className="relative w-full">
            <ul
              onMouseLeave={() => setShowCategories(!showCategories)}
              className="absolute w-full z-10 bg-gray-800 text-white rounded-lg right-0"
            >
              {showCategories
                ? categories.map((category, idx) => (
                    <li
                      key={idx}
                      className={`flex flex-row cursor-pointer p-2 ${
                        categoriesBtn === category ? "bg-gray-500" : ""
                      }`}
                    >
                      <option
                        onClick={() => {
                          handleCategories(category);
                          setShowCategories(false);
                        }}
                        className={`flex flex-col w-full`}
                        value={category}
                      >
                        {category}
                      </option>
                      {categoriesBtn === category ? <AiOutlineCheck /> : null}
                    </li>
                  ))
                : null}
            </ul>
            <button
              onClick={() => {
                setShowCategories(!showCategories);
              }}
              className={`w-full rounded-lg px-5 ${
                categoriesBtn !== "Any Category" ? "bg-blue-300" : "bg-gray-50"
              }`}
            >
              {categoriesBtn}
            </button>
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
          <div className={!details ? "mb-10 pb-10" : "hidden"}>
            <Pagination
              currentPage={currentPage}
              workoutsPerPage={workoutsPerPage}
              workouts={workoutData.length}
              onPageChange={onPageChange}
            />
          </div>
        </ul>
      </div>
    </Suspense>
  );
};

export default AddExercise;
