"use client";

import { useState, Suspense } from "react";
import { HiX } from "react-icons/hi";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import Link from "next/link";
import { createWorkoutSession, createMany } from "@/actions";
import { useRouter } from "next/navigation";
import { Workout, Data } from "@/types";
import LoadingModel from "@/components/models/LoadingModel";
// import { CustomButton } from "@/components";
import { Pagination, paginate } from "@/components/Pagination";
import Image from "next/image";
import { bodyParts, categories } from "@/constants";
import data from "@/constants/exerciseData.json";

type SearchBarProps = {
  recentWorkouts: Workout[];
};

const SearchBar = ({ recentWorkouts }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<string | boolean>(false);

  const [showParts, setShowParts] = useState(false);
  const [partsActivated, setPartsActivated] = useState(false);
  const [bodyPartBtn, setBodyPartBtn] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [categoryActivated, setCategoryActivated] = useState(false);
  const [categoriesBtn, setCategoriesBtn] = useState("");

  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);
  const [recent, setRecent] = useState(recentWorkouts);

  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(50);
  const [workouts, setWorkouts] = useState(data);

  console.log(workouts.length);
  const paginatedPosts = paginate(workouts, currentPage, workoutsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleParts = async (query: string) => {
    let filtered;
    try {
      if (query === "any" && categoriesBtn === "") {
        console.log("firing part first", categoriesBtn);
        setBodyPartBtn("any");
        setWorkouts(data);
        setPartsActivated(false);
      } else if (query === "any") {
        console.log("firing part second", categoriesBtn);
        setBodyPartBtn("");
        const categories = data.filter(
          ({ equipment }) => equipment === categoriesBtn,
        );
        setWorkouts(categories);
        setPartsActivated(false);
      } else if (partsActivated && !categoryActivated) {
        console.log("firing part third");
        filtered = data.filter(({ bodyPart }) => bodyPart === query);
        setWorkouts(filtered);
        setBodyPartBtn(query);
      } else {
        console.log("firing part last");
        filtered = workouts.filter(({ bodyPart }) => bodyPart === query);
        setWorkouts(filtered);
        setBodyPartBtn(query);
      }
      const recentParts = recent.filter(({ bodyPart }) => bodyPart === query);
      setRecent(recentParts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategories = async (query: string) => {
    let categories;
    try {
      if (query === "any" && bodyPartBtn === "any") {
        console.log("firing cat first");
        setCategoriesBtn("");
        setWorkouts(data);
        setCategoryActivated(false);
      } else if (query === "any" && bodyPartBtn !== "any") {
        console.log("firing cat second");
        setCategoriesBtn("");
        const filtered = data.filter(({ bodyPart }) => bodyPart === query);
        setWorkouts(filtered);
      } else if (!partsActivated && categoryActivated) {
        console.log("firing cat third");
        categories = data.filter(({ equipment }) => equipment === query);
        setWorkouts(categories);
        setCategoriesBtn(query);
      } else {
        console.log("firing cat last");
        categories = workouts.filter(({ equipment }) => equipment === query);
        setWorkouts(categories);
        setCategoriesBtn(query);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      const session = await createWorkoutSession();
      const exercises: Data = [];
      workouts.filter((workout) => {
        exerciseQueue.map((exercise) => {
          if (exercise === workout.name) {
            exercises.push(workout);
          }
        });
      });
      if (session) {
        await createMany(exercises, session.id);
        router.push(`/finish-workout/${session.id}`);
      }
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
      ? paginatedPosts
      : paginatedPosts?.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Suspense fallback={<LoadingModel />}>
      <div className="wrapper container">
        <div
          className={!details ? `flex flex-row justify-between my-8` : "hidden"}
        >
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
            !details ? `flex justify-evenly items-center my-2` : "hidden"
          }
        >
          <div>
            <button
              onClick={() => {
                setShowParts(!showParts);
              }}
              className="w-fit h-fit rounded-lg bg-gray-50 px-5 my-5"
            >
              {partsActivated ? bodyPartBtn : "Any Body Part"}
            </button>
            <ul className="fixed bg-gray-800 text-white rounded-lg m-5">
              {showParts
                ? bodyParts.map((part, idx) => (
                    <li key={idx} className="cursor-pointer p-2">
                      <option
                        onClick={() => {
                          handleParts(part);
                          setShowParts(false);
                          setPartsActivated(true);
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
              {categoryActivated ? categoriesBtn : "Any Category"}
            </button>
            <ul className="absolute bg-gray-800 text-white rounded-lg m-5">
              {showCategories
                ? categories.map((category, idx) => (
                    <li key={idx}>
                      <option
                        onClick={() => {
                          handleCategories(category);
                          setShowCategories(false);
                          setCategoryActivated(true);
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
            <h3 className={!details ? "most-recent-title" : "hidden"}>
              RECENT
            </h3>
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
                  src={`/1080/${gifId}.gif` as string}
                  // src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
                  alt="workout gif"
                  height={100}
                  width={100}
                  priority
                  blurDataURL="URL"
                  placeholder="blur"
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
          <h3 className={!details ? "filtered-title" : "hidden"}>EXERCISES</h3>
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
                    src={`/1080/${id}.gif` as string}
                    // src={`https://fitbyfede-db.s3.amazonaws.com/1080/${id}.gif`}
                    height={100}
                    width={100}
                    alt="exercise gif"
                    priority
                    blurDataURL="URL"
                    placeholder="blur"
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
                    src={`/1080/${id}.gif` as string}
                    // src={`https://fitbyfede-db.s3.amazonaws.com/1080/${id}.gif`}
                    height={400}
                    width={400}
                    alt="exercise gif"
                    blurDataURL="URL"
                    placeholder="blur"
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
          <div className="mb-10 pb-10">
            <Pagination
              currentPage={currentPage}
              workoutsPerPage={workoutsPerPage}
              workouts={workouts.length}
              onPageChange={onPageChange}
            />
          </div>
        </ul>
      </div>
    </Suspense>
  );
};

export default SearchBar;
