"use client";

import { useState, Suspense, useMemo } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { Workout, CustomData } from "@/types";
import { Pagination, paginate } from "@/components/Pagination";
import LoadingModal from "@/components/modals/LoadingModal";
import {
  BodyPartSelection,
  CategorySelection,
  CreateExercise,
  FilteredDetails,
  FilteredList,
  RecentDetails,
  RecentList,
} from "@/components";

type SearchExercisesProps = {
  data: CustomData;
  recentWorkouts: Workout[];
};

const SearchExercises = ({ data, recentWorkouts }: SearchExercisesProps) => {
  const [create, setCreate] = useState(false);
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<string | boolean>(false);

  const [bodyPartBtn, setBodyPartBtn] = useState("Any Body Part");
  const [categoriesBtn, setCategoriesBtn] = useState("Any Category");

  const [recent, setRecent] = useState(recentWorkouts);
  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(50);
  const [workouts, setWorkouts] = useState(data);

  const paginatedWorkouts = paginate(workouts, currentPage, workoutsPerPage);

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
      <div className="flex flex-row justify-between gap-3">
        <button
          type="button"
          onClick={() => setCreate(true)}
          className="text-white p-color w-full py-1.5 rounded-md cursor-pointer"
        >
          New
        </button>
        <button
          type="button"
          className="flex justify-center items-center text-3xl text-[#c1121f] w-full rounded-md bg-[#2f3651]"
        >
          <Link rel="noopener" href="/workouts">
            <HiX role="none" />
          </Link>
        </button>
      </div>
      <form rel="noopener" className="searchbar-form my-2">
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
      {create && <CreateExercise setCreate={setCreate} />}
      <ul className="overflow-auto">
        {recent.length ? (
          <h1 className="line-design filtered-title font-bold text-center">
            RECENT
          </h1>
        ) : null}
        <Suspense fallback={<LoadingModal />}>
          <RecentList recent={recent} setDetails={setDetails} />
        </Suspense>
        <h1 className="line-design filtered-title font-bold text-center">
          EXERCISES
        </h1>
        <ul className="overflow-auto">
          <FilteredList
            filteredExercises={filteredExercises}
            setDetails={setDetails}
          />
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
  ) : (
    <div className="wrapper container py-3">
      <ul>
        <RecentDetails
          recent={recent}
          details={details}
          setDetails={setDetails}
        />
      </ul>
      <ul className="pb-20">
        <FilteredDetails
          filteredExercises={filteredExercises}
          details={details}
          setDetails={setDetails}
        />
      </ul>
    </div>
  );
};

export default SearchExercises;
