"use client";

import { useState, useMemo, Suspense } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { createManyWorkouts } from "@/actions/workouts";
import { useRouter } from "next/navigation";
import { Workout, CustomData } from "@/types";
import LoadingModal from "@/components/modals/LoadingModal";
import {
  BodyPartSelection,
  CategorySelection,
  CreateExercise,
  FilteredDetails,
  RecentDetails,
} from "@/components";
import FilteredList from "./FilteredList";
import RecentList from "./RecentList";
import { Pagination, paginate } from "@/components/Pagination";

type SearchBarProps = {
  data: CustomData;
  recentWorkouts: Workout[];
};

const SearchBar = ({ data, recentWorkouts }: SearchBarProps) => {
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
  const [workouts, setWorkouts] = useState(data);

  const paginatedWorkouts = paginate(workouts, currentPage, workoutsPerPage);

  const handleClick = async () => {
    try {
      const session = await createManyWorkouts(exerciseQueue);
      if (session) {
        router.push(`/create-workout/${session.id}`);
      }
    } catch (error) {
      console.log("Error creating workouts in searchbar ", error);
    }
  };

  const addToExercises = (name: string) => {
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
      : paginatedWorkouts.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  }, [query, paginatedWorkouts]);

  return !details ? (
    <div className="wrapper m-5 p-2">
      <div className="backdrop-blur-lg rounded-md overflow-hidden">
        <div className="flex flex-row justify-between gap-3">
          <button
            type="button"
            onClick={() => setCreate(true)}
            className="text-white bg-[#24293e] w-full py-1.5 rounded-md cursor-pointer"
          >
            New
          </button>
          <button
            type="button"
            className="flex justify-center items-center text-3xl text-[#c1121f] w-full rounded-md bg-[#24293e]"
          >
            <Link rel="noopener" href="/workouts">
              <HiX role="none" />
            </Link>
          </button>
          <button
            type="button"
            onClick={handleClick}
            className="text-[#8ebbff] bg-[#24293e] w-full py-1.5 rounded-md"
          >
            {exerciseQueue?.length ? `Add (${exerciseQueue?.length})` : "Add"}
          </button>
        </div>
        <form className="searchbar-form my-2" rel="noopener">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            name="query"
            placeholder="Search"
            className="w-full bg-white text-black rounded-md py-1.5 pl-4"
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
        {create ? <CreateExercise setCreate={setCreate} /> : null}
        {recent.length ? (
          <h1 className="line-design font-bold text-center">RECENT</h1>
        ) : null}
        <Suspense fallback={<LoadingModal />}>
          <RecentList
            recent={recent}
            exerciseQueue={exerciseQueue}
            addToExercises={addToExercises}
            setDetails={setDetails}
          />
        </Suspense>
        <h1 className="line-design font-bold text-center">EXERCISES</h1>
        <Suspense fallback={<LoadingModal />}>
          <FilteredList
            filteredExercises={filteredExercises}
            exerciseQueue={exerciseQueue}
            addToExercises={addToExercises}
            setDetails={setDetails}
          />
        </Suspense>
      </div>
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
    </div>
  ) : (
    <div className="wrapper py-3">
      <ul>
        <Suspense fallback={<LoadingModal />}>
          <RecentDetails
            recent={recent}
            details={details}
            setDetails={setDetails}
          />
        </Suspense>
      </ul>
      <ul className="pb-20">
        <Suspense fallback={<LoadingModal />}>
          <FilteredDetails
            filteredExercises={filteredExercises}
            details={details}
            setDetails={setDetails}
          />
        </Suspense>
      </ul>
    </div>
  );
};

export default SearchBar;
