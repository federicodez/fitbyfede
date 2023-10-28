"use client";

import { useState, Suspense } from "react";
import { HiX } from "react-icons/hi";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import Link from "next/link";
import { createWorkoutSession, createMany } from "@/actions";
import { useRouter } from "next/navigation";
import { Workout, Data } from "@/types";
import LoadingModel from "@/components/models/LoadingModel";
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
  const [bodyPartBtn, setBodyPartBtn] = useState("Any Body Part");
  const [showCategories, setShowCategories] = useState(false);
  const [categoriesBtn, setCategoriesBtn] = useState("Any Category");

  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);
  const [recent, setRecent] = useState(recentWorkouts);

  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(50);
  const [workouts, setWorkouts] = useState(data);

  const paginatedPosts = paginate(workouts, currentPage, workoutsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleParts = async (query: string) => {
    let filtered;
    try {
      if (query === "any" && categoriesBtn === "Any Category") {
        setBodyPartBtn("Any Body Part");
        setWorkouts(data);
      } else if (query === "any" && categoriesBtn !== "Any Category") {
        setBodyPartBtn("Any Body Part");
        const categories = data.filter(
          ({ equipment }) => equipment === categoriesBtn,
        );
        setWorkouts(categories);
      } else if (categoriesBtn !== "Any Category") {
        const filtered: Data = [];
        data.filter((item) => {
          if (item.bodyPart === query && item.equipment === categoriesBtn) {
            filtered.push(item);
          }
        });
        setWorkouts(filtered);
        setBodyPartBtn(query);
        const recentParts = recentWorkouts.filter(
          ({ bodyPart }) => bodyPart === query,
        );
        setRecent(recentParts);
      } else {
        filtered = data.filter(({ bodyPart }) => bodyPart === query);
        setWorkouts(filtered);
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
        setWorkouts(data);
      } else if (query === "any" && bodyPartBtn !== "Any Body Part") {
        setCategoriesBtn("Any Category");
        const filtered = data.filter(
          ({ bodyPart }) => bodyPart === bodyPartBtn,
        );
        setWorkouts(filtered);
      } else if (bodyPartBtn !== "Any Body Part") {
        const filtered: Data = [];
        data.filter((item) => {
          if (item.equipment === query && item.bodyPart === bodyPartBtn) {
            filtered.push(item);
          }
        });
        setWorkouts(filtered);
        setCategoriesBtn(query);
      } else {
        categories = data.filter(({ equipment }) => equipment === query);
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
      if (session) {
        await createMany(exerciseQueue, session.id);
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
        <ul className="mb-20">
          {recent?.length ? (
            <h3 className={!details ? "most-recent-title" : "hidden"}>
              RECENT
            </h3>
          ) : null}
          {recent?.map(({ bodyPart, gifId, id, name }) => (
            <li key={id} className="my-4">
              <div
                className={
                  !details
                    ? `grid grid-cols-4 items-center rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                    : "hidden"
                }
                onClick={() => {
                  addToExercises(name);
                }}
              >
                <Image
                  className="col-span-1"
                  id="gif"
                  // src={`/1080/${gifId}.gif` as string}
                  src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
                  width={100}
                  height={100}
                  alt="workout gif"
                  priority
                />
                <div className="col-span-2 flex flex-col items-center mx-2">
                  <strong id="name" className="w-full">
                    {name}
                  </strong>
                  <span className="w-full">{bodyPart}</span>
                </div>
                <div
                  onClick={() => setDetails(id)}
                  className="justify-self-end rounded-md bg-white w-fit p-1 mr-5"
                >
                  {exerciseQueue.includes(name) ? (
                    <AiOutlineCheck />
                  ) : (
                    <AiOutlineQuestion />
                  )}
                </div>
              </div>

              <li
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
                  src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
                  height={400}
                  width={400}
                  alt="exercise gif"
                />
              </li>
            </li>
          ))}
          <h3 className={!details ? "filtered-title" : "hidden"}>EXERCISES</h3>
          <ul className="mb-20">
            {filteredExercises?.map(
              ({ bodyPart, id, name, secondaryMuscles, instructions }) => (
                <li key={id} className="my-4">
                  <div
                    className={
                      !details
                        ? `grid grid-cols-4 items-center rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
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
                      priority
                    />
                    <div className="col-span-2 flex flex-col items-center mx-2">
                      <strong id="name" className="w-full">
                        {name}
                      </strong>
                      <div className="w-full" id="bodypart">
                        {bodyPart}
                      </div>
                    </div>
                    <div
                      onClick={() => setDetails(id)}
                      className="justify-self-end rounded-md bg-white w-fit p-1 mr-5"
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
                        ? `flex flex-col p-5 my-2 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
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
                      // src={`/1080/${id}.gif` as string}
                      src={`https://fitbyfede-db.s3.amazonaws.com/1080/${id}.gif`}
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
                </li>
              ),
            )}
          </ul>
          <div className={!details ? "mb-10 pb-10" : "hidden"}>
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
