"use client";

import { useState, MouseEvent } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { exercises, bodyParts, categories } from "@/constants";
import { getSpecificBodyPart, getCategory } from "@/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Data = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}[];

type SearchBarProps = {
  data: Data;
};

const SearchBar = ({ data }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<string | boolean>(false);
  const [showParts, setShowParts] = useState(false);
  const [workouts, setWorkouts] = useState(data);
  const [bodyPartBtn, setBodyPartBtn] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [categoriesBtn, setCategoriesBtn] = useState("");

  const router = useRouter();

  const handleParts = async (query: string) => {
    try {
      const data = await getSpecificBodyPart(query);
      setBodyPartBtn(query);
      setWorkouts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategories = async (query: string) => {
    try {
      const data = await getCategory(query);
      setCategoriesBtn(query);
      setWorkouts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredExercises =
    query === ""
      ? workouts
      : workouts.filter(({ name }) =>
          name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <>
      <div className="wrapper container">
        <div
          className={!details ? `flex flex-row justify-between mt-8` : "hidden"}
        >
          <button type="button" className="text-[#03045e]" id="create-btn">
            <Link href="/create-workout">New</Link>
          </button>
        </div>
        <h1 className={!details ? `text-center font-bold` : "hidden"}>
          Exercises
        </h1>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="query"
          placeholder="Search"
          className={!details ? `w-full rounded-md bg-white` : "hidden"}
        />
        <div
          className={
            !details ? `flex justify-evenly items-center my-2` : "hidden"
          }
        >
          <div>
            <button
              onClick={() => {
                setShowParts(true);
              }}
              className="w-fit h-fit rounded-lg bg-gray-50 px-5"
            >
              {bodyPartBtn ? bodyPartBtn : "Any Body Part"}
            </button>
            <ul className="grid grid-cols-10">
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
                setShowCategories(true);
              }}
              className="w-fit h-fit rounded-lg bg-gray-50 px-5"
            >
              {categoriesBtn ? categoriesBtn : "Any Category"}
            </button>
            <ul>
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
        {filteredExercises.map(
          ({ bodyPart, gifUrl, id, name, secondaryMuscles, instructions }) => (
            <div key={id}>
              <div
                className={
                  !details
                    ? `grid grid-cols-6 gap-5 m-5 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                    : "hidden"
                }
                onClick={() => setDetails(id)}
              >
                <Image
                  className="col-span-1"
                  id="gif"
                  src={gifUrl}
                  height={100}
                  width={100}
                  alt="exercise gif"
                  priority={true}
                />
                <div className="grid grid-rows-2 col-span-5 items-center">
                  <strong id="name" className="row-span-1">
                    {name}
                  </strong>
                  <div className="row-span-1" id="bodypart">
                    {bodyPart}
                  </div>
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
                  src={gifUrl}
                  height={400}
                  width={400}
                  alt="exercise gif"
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
      </div>
    </>
  );
};

export default SearchBar;
