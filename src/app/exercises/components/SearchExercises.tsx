"use client";

import { useState, Suspense } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { Workout, CustomData } from "@/types";
import { Pagination, paginate } from "@/components/Pagination";
import LoadingModel from "@/components/models/LoadingModel";
import { AiOutlineQuestion } from "react-icons/ai";
import { BodyPartSelection, CategorySelection } from "@/components";
import { CreateExercise } from "@/components";

type SearchExercisesProps = {
  data: CustomData;
  recentWorkouts: Workout[];
};

const SearchExercises = ({ data, recentWorkouts }: SearchExercisesProps) => {
  const [create, setCreate] = useState(false);
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<string | boolean>(false);

  const [showParts, setShowParts] = useState(false);
  const [bodyPartBtn, setBodyPartBtn] = useState("Any Body Part");
  const [showCategories, setShowCategories] = useState(false);
  const [categoriesBtn, setCategoriesBtn] = useState("Any Category");

  const [recent, setRecent] = useState(recentWorkouts);
  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(50);
  const [workouts, setWorkouts] = useState(data);

  const paginatedWorkouts = paginate(workouts, currentPage, workoutsPerPage);

  const onPageChange = (page: number) => setCurrentPage(page);

  const filteredExercises =
    query === ""
      ? paginatedWorkouts
      : paginatedWorkouts.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

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
          type="text"
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
          showParts={showParts}
          setRecent={setRecent}
          setWorkouts={setWorkouts}
          setBodyPartBtn={setBodyPartBtn}
          setShowParts={setShowParts}
        />
        <CategorySelection
          data={data}
          bodyPartBtn={bodyPartBtn}
          categoriesBtn={categoriesBtn}
          showCategories={showCategories}
          setShowCategories={setShowCategories}
          setCategoriesBtn={setCategoriesBtn}
          setWorkouts={setWorkouts}
        />
      </div>
      {create && <CreateExercise setCreate={setCreate} />}
      <ul className="">
        {recent.length ? (
          <h1 className="line-design filtered-title font-bold text-center">
            RECENT
          </h1>
        ) : null}
        <Suspense fallback={<LoadingModel />}>
          {recent.map(({ bodyPart, gifId, id, name }) => (
            <li key={id} className="my-4">
              <div className="grid grid-cols-4 items-center rounded-md bg-[#2f3651] shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
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
                  className="justify-self-end bg-white rounded-md text-black w-fit p-1 mr-5"
                >
                  <AiOutlineQuestion role="none" />
                </div>
              </div>
            </li>
          ))}
        </Suspense>
        <h1 className="line-design filtered-title font-bold text-center">
          EXERCISES
        </h1>
        <ul className="">
          <Suspense fallback={<LoadingModel />}>
            {filteredExercises?.map(({ bodyPart, id, name }) => (
              <li key={id} className="my-4">
                <div className="grid grid-cols-4 items-center bg-[#2f3651] rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
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
                    className="justify-self-end bg-white text-black rounded-md w-fit p-1 mr-5"
                  >
                    <AiOutlineQuestion role="none" />
                  </div>
                </div>
              </li>
            ))}
          </Suspense>
        </ul>
        <Suspense fallback={<LoadingModel />}>
          <div className="mt-10 mb-20 pb-20">
            <Pagination
              currentPage={currentPage}
              workoutsPerPage={workoutsPerPage}
              workouts={workouts.length}
              onPageChange={onPageChange}
            />
          </div>
        </Suspense>
      </ul>
    </div>
  ) : (
    <div className="wrapper container py-3">
      <ul>
        {recent?.map(({ gifId, id, name, instructions }) => (
          <li key={id} className="p-color">
            <div
              className={
                details === id
                  ? `flex flex-col p-5 my-10 rounded-md  shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                  : "hidden"
              }
            >
              <button
                type="button"
                className="flex justify-center items-center w-10 h-5 rounded-lg bg-gray-50"
                onClick={() => setDetails(false)}
              >
                <HiX role="none" />
              </button>
              <h1 className="text-center m-2 font-bold" id="name">
                {name}
              </h1>
              <Image
                className="flex self-center rounded-md"
                id="gif"
                src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
                height={400}
                width={400}
                alt="exercise gif"
              />
              <h1 className="text-center m-2 underline font-semibold">
                Instructions
              </h1>
              <ol className="px-10">
                {instructions.map((item, itemId) => (
                  <li key={itemId} id="intructions" className="list-decimal">
                    {item}
                  </li>
                ))}
              </ol>
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
                  type="button"
                  className="flex justify-center items-center w-10 h-5 rounded-lg bg-gray-50"
                  onClick={() => setDetails(false)}
                >
                  <HiX role="none" />
                </button>
                <h1 className="text-center m-2 font-bold" id="name">
                  {name}
                </h1>
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

export default SearchExercises;
