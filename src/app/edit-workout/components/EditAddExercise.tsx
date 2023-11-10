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
import data from "@/constants/exerciseData.json";
import { Pagination, paginate } from "@/components/Pagination";
import { EditBodyPartSelection, EditCategorySelection } from "./index";

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
  const [workouts, setWorkouts] = useState(data);

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
      const newSession = await createMany(exerciseQueue, session);
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

  return !details ? (
    <Suspense fallback={<LoadingModel />}>
      <div className="wrapper container">
        <div className="flex flex-row justify-between my-8">
          <button
            type="button"
            className="text-[#03045e] p-color px-6 py-0 rounded-md"
            id="create-btn"
          >
            <Link href="/create-workout" className="text-[#8ebbff]">
              New
            </Link>
          </button>
          <button
            type="button"
            className="text-[#c1121f] px-4 py-0 rounded-md bg-[#2f3651]"
            id="cancel-btn"
          >
            <Link href="/workouts">
              <HiX />
            </Link>
          </button>
          <button
            type="button"
            onClick={handleClick}
            className={
              exerciseQueue.length
                ? `text-[#8ebbff] bg-[#2f3651] px-6 py-0 rounded-md`
                : "bg-[#2f3651] px-9 py-0 rounded-md"
            }
            id="__add-btn"
          >
            {exerciseQueue?.length ? `Add (${exerciseQueue?.length})` : "Add"}
          </button>
        </div>
        <form className="searchbar-form">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="query"
            placeholder="Search"
            className="w-full bg-white rounded-lg"
          />
        </form>
        <div className="grid grid-cols-2 justify-center items-center gap-3 my-2">
          <EditBodyPartSelection
            data={data}
            bodyPartBtn={bodyPartBtn}
            recentWorkouts={recentWorkouts}
            categoriesBtn={categoriesBtn}
            showParts={showParts}
            setRecent={setRecent}
            setBodyPartBtn={setBodyPartBtn}
            setShowParts={setShowParts}
          />
          <EditCategorySelection
            data={data}
            bodyPartBtn={bodyPartBtn}
            categoriesBtn={categoriesBtn}
            showCategories={showCategories}
            setShowCategories={setShowCategories}
            setCategoriesBtn={setCategoriesBtn}
          />
        </div>
        <ul className="">
          {recent.length ? (
            <h3 className="filtered-title font-bold text-center backdrop-blur-lg">
              RECENT
            </h3>
          ) : null}
          {recent.map(({ bodyPart, gifId, id, name }) => (
            <li key={id} className="my-4">
              <div
                className="grid grid-cols-4 items-center rounded-md bg-[#2f3651] shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]"
                onClick={() => addToExercises(name)}
              >
                <Image
                  className="col-span-1"
                  id="gif"
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
                  className={`${
                    exerciseQueue.includes(name) ? "bg-[#8ebbff]" : "bg-white"
                  } justify-self-end rounded-md text-black w-fit p-1 mr-5`}
                >
                  {exerciseQueue.includes(name) ? (
                    <AiOutlineCheck className="" />
                  ) : (
                    <AiOutlineQuestion className="" />
                  )}
                </div>
              </div>
            </li>
          ))}
          <h3 className="filtered-title font-bold text-center backdrop-blur-lg">
            EXERCISES
          </h3>
          <ul className="">
            {filteredExercises?.map(({ bodyPart, id, name }) => (
              <li key={id} className="my-4">
                <div
                  className="grid grid-cols-4 items-center bg-[#2f3651] rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]"
                  onClick={() => addToExercises(name)}
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
                    className={`${
                      exerciseQueue.includes(name) ? "bg-[#8ebbff]" : "bg-white"
                    } justify-self-end text-black rounded-md w-fit p-1 mr-5`}
                  >
                    {exerciseQueue.includes(name) ? (
                      <AiOutlineCheck />
                    ) : (
                      <AiOutlineQuestion />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 mb-20 pb-20">
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
  ) : (
    <div className="wrapper container py-3">
      <ul className="">
        {recent?.map(({ gifId, id, name }) => (
          <li key={id} className="my-4">
            <div
              className={
                details === id
                  ? `flex flex-col p-5 my-10 rounded-md  shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
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
            </div>
          </li>
        ))}
      </ul>
      <ul className="pb-20">
        {filteredExercises?.map(
          ({ id, name, secondaryMuscles, instructions }) => (
            <li key={id} className="p-color">
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
                    <li key={itemId} id="intructions" className="list-decimal">
                      {item}
                    </li>
                  ))}
                </ol>
                <h3 className="underline m-2 font-semibold text-center">
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
    </div>
  );
};

export default AddExercise;
