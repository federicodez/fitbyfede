"use client";

import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { HiX } from "react-icons/hi";
import { bodyParts, categories } from "@/constants";
import { addExercise } from "@/actions/workouts";
import { AiOutlineCheck } from "react-icons/ai";

type CreateExerciseProps = {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateExercise = ({ setCreate }: CreateExerciseProps) => {
  const [exercise, setExercise] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [partSelected, setPartSelected] = useState("Any Body Part");
  const [categorySelected, setCategorySelected] = useState("Any Category");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showOptions) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(e.target as HTMLElement)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menuRef, showOptions, setShowOptions]);

  const submitExercise = async () => {
    try {
      await addExercise(exercise, partSelected, categorySelected);
      setCreate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e: ChangeEvent) => {
    setExercise((e.target as HTMLInputElement).value);
  };

  return (
    <div
      className={`
      fixed 
      z-10
      p-3
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-[#8ebbff] 
      w-96
      h-fit
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
    `}
    >
      <div ref={menuRef} className="flex flex-row justify-evenly">
        <button
          type="button"
          onClick={() => setCreate(false)}
          className="text-[#c1121f] px-4 py-0 rounded-md bg-[#2f3651]"
        >
          <HiX role="none" />
        </button>
        <h1 className="text-xl font-semibold">Create New Exercise</h1>
        <button
          type="button"
          className="text-[#8ebbff] bg-[#2f3651] px-6 py-0 rounded-md"
          onClick={submitExercise}
        >
          Save
        </button>
      </div>
      <input
        onChange={(e) => handleInput(e)}
        type="text"
        name="exercise"
        placeholder="Add Name"
        className="w-full bg-white text-black rounded-md my-5 py-1.5 pl-4"
      />

      <div className="grid grid-cols-2 justify-center items-center gap-3 my-2 overflow-auto">
        {showParts && showOptions && (
          <ul className="absolute top-0 bg-gray-800 w-[225px] md:w-[425px] h-full z-10 text-white rounded-lg left-0 overflow-auto">
            {bodyParts.slice(1).map((part, idx) => (
              <li
                key={idx}
                className={` flex flex-row cursor-pointer p-2 ${
                  partSelected === part ? "bg-gray-500" : ""
                }`}
              >
                <div
                  role="button"
                  onClick={() => {
                    setPartSelected(part);
                    setShowParts(false);
                    setShowOptions(!showOptions);
                  }}
                  className={`flex flex-col w-full`}
                  id={part}
                >
                  {part}
                </div>
                {partSelected === part ? <AiOutlineCheck role="none" /> : null}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => {
            setShowParts(true);
            setShowCategories(false);
            setShowOptions(true);
          }}
          className={`w-full rounded-md py-1.5 text-black ${
            partSelected !== "Any Body Part" ? "bg-blue-300" : "bg-gray-50"
          }`}
        >
          {partSelected}
        </button>

        {showCategories && showOptions && (
          <ul className="absolute top-0 bg-gray-800 w-fit h-full z-10 text-white rounded-lg right-0 overflow-auto">
            {categories.slice(1).map((category, idx) => (
              <li
                key={idx}
                className={`flex flex-row cursor-pointer p-2 ${
                  categorySelected === category ? "bg-gray-500" : ""
                }`}
              >
                <div
                  role="button"
                  onClick={() => {
                    setCategorySelected(category);
                    setShowCategories(false);
                    setShowOptions(!showOptions);
                  }}
                  className={`flex flex-col w-full`}
                  id={category}
                >
                  {category}
                </div>
                {categorySelected === category ? (
                  <AiOutlineCheck role="none" />
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => {
            setShowCategories(true);
            setShowParts(false);
            setShowOptions(true);
          }}
          className={`w-full rounded-md py-1.5 text-black ${
            categorySelected !== "Any Category" ? "bg-blue-300" : "bg-gray-50"
          }`}
        >
          {categorySelected}
        </button>
      </div>
    </div>
  );
};

export default CreateExercise;
