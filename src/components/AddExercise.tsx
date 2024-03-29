"use client";

import { Suspense, useState, useMemo } from "react";
import { HiX } from "react-icons/hi";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";
import Link from "next/link";
import { createManyWorkouts, getSessionById } from "@/actions/workouts";
import { useRouter } from "next/navigation";
import { Workout, Data, WorkoutSession, CustomData } from "@/types";
import LoadingModal from "@/components/modals/LoadingModal";
import Image from "next/image";
import data from "@/constants/exerciseData.json";
import { Pagination, paginate } from "@/components/Pagination";
import { BodyPartSelection, CategorySelection, CreateExercise } from "./";

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
  const [create, setCreate] = useState(false);

  const [bodyPartBtn, setBodyPartBtn] = useState("Any Body Part");
  const [categoriesBtn, setCategoriesBtn] = useState("Any Category");

  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);
  const [recent, setRecent] = useState(recentWorkouts);

  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(50);
  const [workouts, setWorkouts] = useState<CustomData | Data>(data);

  const paginatedWorkouts = paginate(workouts, currentPage, workoutsPerPage);

  const handleClick = async () => {
    try {
      await createManyWorkouts(exerciseQueue, session);
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

  const filteredExercises = useMemo(() => {
    return query === ""
      ? paginatedWorkouts
      : paginatedWorkouts?.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  }, [query, paginatedWorkouts]);

  return !details ? (
    <Suspense fallback={<LoadingModal />}>
      <div className="wrapper container">
        <div className="flex flex-row justify-between my-8">
          <button
            onClick={() => {
              setCreate(true);
            }}
            className="text-white p-color px-6 py-0 rounded-md cursor-pointer"
          >
            New
          </button>
          <button
            type="button"
            className="text-[#c1121f] px-4 py-0 rounded-md bg-[#2f3651]"
            id="cancel-btn"
          >
            <Link rel="noopener" href="/workouts">
              <HiX role="presentation" />
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
        <form rel="noopener" className="searchbar-form">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="query"
            placeholder="Search"
            className="w-full bg-white rounded-lg"
          />
        </form>
        <div className="grid grid-cols-2 justify-center items-center gap-3 my-2">
          <BodyPartSelection
            data={data}
            bodyPartBtn={bodyPartBtn}
            recentWorkouts={recentWorkouts}
            categoriesBtn={categoriesBtn}
            setRecent={setRecent}
            setWorkouts={setWorkouts}
            setBodyPartBtn={setBodyPartBtn}
          />
          <CategorySelection
            data={data}
            bodyPartBtn={bodyPartBtn}
            categoriesBtn={categoriesBtn}
            setCategoriesBtn={setCategoriesBtn}
            setWorkouts={setWorkouts}
          />
        </div>
        {create && <CreateExercise setCreate={setCreate} />}
        <ul className="">
          {recent.length ? (
            <h1 className="filtered-title font-bold text-center backdrop-blur-lg">
              RECENT
            </h1>
          ) : null}
          {recent.map(({ bodyPart, gifId, id, name }) => (
            <li key={id} className="my-4">
              <div
                role="button"
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
                  role="button"
                  onClick={() => setDetails(id)}
                  className={`${
                    exerciseQueue.includes(name) ? "bg-[#8ebbff]" : "bg-white"
                  } justify-self-end rounded-md text-black w-fit p-1 mr-5`}
                >
                  {exerciseQueue.includes(name) ? (
                    <AiOutlineCheck role="none" />
                  ) : (
                    <AiOutlineQuestion role="none" />
                  )}
                </div>
              </div>
            </li>
          ))}
          <h1 className="filtered-title font-bold text-center backdrop-blur-lg">
            EXERCISES
          </h1>
          <ul className="">
            {filteredExercises?.map(({ bodyPart, id, name }) => (
              <li key={id} className="my-4">
                <div
                  role="button"
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
                    role="button"
                    onClick={() => setDetails(id)}
                    className={`${
                      exerciseQueue.includes(name) ? "bg-[#8ebbff]" : "bg-white"
                    } justify-self-end text-black rounded-md w-fit p-1 mr-5`}
                  >
                    {exerciseQueue.includes(name) ? (
                      <AiOutlineCheck role="none" />
                    ) : (
                      <AiOutlineQuestion role="none" />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Suspense fallback={<LoadingModal />}>
            <div className="mt-10 mb-20 pb-10 md:mb-10 md:pb-0">
              <Pagination
                currentPage={currentPage}
                workoutsPerPage={workoutsPerPage}
                workouts={workouts.length}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </Suspense>
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
                <HiX role="presentation" />
              </button>
              <h2 className="text-center m-2 font-bold" id="name">
                {name}
              </h2>
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
                  <HiX role="presentation" />
                </button>
                <h2 className="text-center m-2 font-bold" id="name">
                  {name}
                </h2>
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
                <h2 className="text-center m-2 underline font-semibold">
                  Instructions
                </h2>
                <ol className="px-10">
                  {instructions?.map((item, itemId) => (
                    <li key={itemId} id="intructions" className="list-decimal">
                      {item}
                    </li>
                  ))}
                </ol>
                <h2 className="underline m-2 font-semibold text-center">
                  Secondary Mucles
                </h2>
                <ol className="px-10" type="1">
                  {secondaryMuscles?.map((muscle, muscleId) => (
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
